import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

PORT = int(os.environ.get("PORT", "3001"))
API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")


class KisaanSaathiHandler(SimpleHTTPRequestHandler):
    def end_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "null")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.end_json(204, {})

    def do_GET(self):
        if self.path == "/api/health":
            # include last error summary if available
            last = {}
            try:
                with open('last_error.json', 'r', encoding='utf-8') as f:
                    last = json.load(f)
            except Exception:
                last = {}
            self.end_json(200, {"configured": bool(API_KEY), "model": MODEL, "last_error": last})
            return
        if self.path == "/api/debug":
            try:
                with open('last_error.json', 'r', encoding='utf-8') as f:
                    last = json.load(f)
            except Exception:
                last = {"error": "no debug info available"}
            self.end_json(200, last)
            return
        super().do_GET()

    def do_POST(self):
        if self.path != "/api/chat":
            self.end_json(404, {"error": "Endpoint not found."})
            return
        if not API_KEY:
            self.end_json(503, {"error": "GEMINI_API_KEY is not configured on the backend."})
            return

        def save_last_error(info):
            try:
                with open('last_error.json', 'w', encoding='utf-8') as f:
                    json.dump(info, f, ensure_ascii=False, indent=2)
            except Exception:
                pass

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length > 20000:
                raise ValueError("Request is too large.")
            payload = json.loads(self.rfile.read(length) or b"{}")
            message = payload.get("message", "").strip()
            language = payload.get("language", "en")
            if not message or len(message) > 4000:
                raise ValueError("Message must contain 1 to 4,000 characters.")

            prompt = f"""You are KisaanSaathi, a careful agricultural assistant for Indian farmers.
Reply in the requested language code: {language}. Use the user's language when possible.
Answer the farmer's exact question directly, with practical numbered steps and clear quantities or timing when appropriate.
Ask one short follow-up question only when important information is missing, such as crop, location, growth stage, or symptoms.
Never claim certainty from text or a photo alone. For pesticide advice, mention label directions and local agricultural experts.

Farmer question:
{message}"""
            request_body = json.dumps({
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.3, "maxOutputTokens": 800}
            }).encode("utf-8")
            request = Request(
                f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}",
                data=request_body,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urlopen(request, timeout=45) as response:
                result = json.loads(response.read())
            parts = result.get("candidates", [{}])[0].get("content", {}).get("parts", [])
            reply = "".join(part.get("text", "") for part in parts).strip()
            if not reply:
                raise RuntimeError("Gemini returned an empty response.")
            # clear last error on success
            save_last_error({"ok": True, "message": "last successful call"})
            self.end_json(200, {"reply": reply})
        except HTTPError as error:
            details = error.read().decode("utf-8", errors="replace")
            try:
                details_parsed = json.loads(details)
                details_msg = details_parsed.get("error", {}).get("message", details)
            except Exception:
                details_msg = details
            info = {"type": "HTTPError", "code": getattr(error, 'code', None), "message": str(details_msg)}
            save_last_error(info)
            self.end_json(getattr(error, 'code', 502), {"error": details_msg or "Gemini request failed."})
        except (URLError, TimeoutError) as err:
            info = {"type": "NetworkError", "message": str(err)}
            save_last_error(info)
            self.end_json(502, {"error": "Could not connect to Gemini."})
        except (ValueError, RuntimeError) as error:
            info = {"type": "BadRequest", "message": str(error)}
            save_last_error(info)
            self.end_json(400, {"error": str(error)})
        except Exception as error:
            info = {"type": "ServerError", "message": str(error)}
            save_last_error(info)
            self.end_json(500, {"error": str(error)})


if __name__ == "__main__":
    print(f"KisaanSaathi backend running at http://localhost:{PORT}")
    ThreadingHTTPServer(("localhost", PORT), KisaanSaathiHandler).serve_forever()

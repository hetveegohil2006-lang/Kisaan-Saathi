import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT || 3001);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const ROOT = fileURLToPath(new URL('.', import.meta.url));

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
};

function sendJson(response, statusCode, body) {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    });
    response.end(JSON.stringify(body));
}

async function readRequestBody(request) {
    let body = '';
    for await (const chunk of request) {
        body += chunk;
        if (body.length > 20_000) {
            throw new Error('Request is too large.');
        }
    }
    return JSON.parse(body || '{}');
}

async function handleChat(request, response) {
    if (!GEMINI_API_KEY) {
        sendJson(response, 503, { error: 'GEMINI_API_KEY is not configured on the backend.' });
        return;
    }

    const body = await readRequestBody(request);
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const language = typeof body.language === 'string' ? body.language : 'en';
    if (!message || message.length > 4_000) {
        sendJson(response, 400, { error: 'Message must contain 1 to 4,000 characters.' });
        return;
    }

    const prompt = `You are KisaanSaathi, a careful agricultural assistant for Indian farmers.
Reply in the requested language code: ${language}.
Give practical, concise advice. Ask for the crop, location, growth stage, and symptoms when needed.
Do not claim to diagnose a disease from text alone. For pesticides or medical/financial decisions, recommend following local labels and qualified experts.

Farmer question:
${message}`;

    const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
    );
    const result = await geminiResponse.json();
    if (!geminiResponse.ok) {
        const providerError = result?.error?.message || 'Gemini request failed.';
        sendJson(response, geminiResponse.status, { error: providerError });
        return;
    }

    const reply = result?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || '')
        .join('')
        .trim();
    if (!reply) {
        sendJson(response, 502, { error: 'Gemini returned an empty response.' });
        return;
    }
    sendJson(response, 200, { reply });
}

async function serveStatic(request, response) {
    const requestedPath = request.url === '/' ? 'dashboard.html' : request.url.split('?')[0].replace(/^[/\\]+/, '');
    const filePath = normalize(join(ROOT, requestedPath));
    if (!filePath.startsWith(ROOT)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
    }
    try {
        const contents = await readFile(filePath);
        response.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream' });
        response.end(contents);
    } catch {
        response.writeHead(404);
        response.end('Not found');
    }
}

const server = http.createServer(async (request, response) => {
    try {
        if (request.method === 'OPTIONS') {
            sendJson(response, 204, {});
        } else if (request.method === 'POST' && request.url === '/api/chat') {
            await handleChat(request, response);
        } else if (request.method === 'GET') {
            await serveStatic(request, response);
        } else {
            sendJson(response, 405, { error: 'Method not allowed.' });
        }
    } catch (error) {
        sendJson(response, 500, { error: error.message || 'Unexpected server error.' });
    }
});

server.listen(PORT, () => {
    console.log(`KisaanSaathi backend running at http://localhost:${PORT}`);
});

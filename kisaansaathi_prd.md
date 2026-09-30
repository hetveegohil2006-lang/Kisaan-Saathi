# Product Requirement Document (PRD): KisaanSaathi
**Tagline:** Smart Agriculture. Better Decisions. Stronger Farmers.  
**Project Type:** AI-Powered Web Application / Smart Agriculture Platform  
**Theme:** BRICS — Cooperation  
**Document Status:** Implementation-Ready Specification  

---

## 1. Product Overview
**KisaanSaathi** is an interoperable digital agriculture platform engineered to bridge the information gap for smallholder farmers across emerging economies (specifically BRICS nations). By integrating localized environmental telemetry, rule-based agronomic algorithms, computer vision pest diagnostics, and context-aware generative AI guidance, KisaanSaathi enables farmers to make data-driven decisions that optimize yield, reduce input costs, and mitigate agricultural risks.

The application serves as a single-point operational portal where farmers track soil health, farm finances, weather risks, natural pest remedies, and government welfare programs. It features a future-ready, standardized schema layer designed for cross-border agricultural knowledge exchange across BRICS member states.

---

## 2. Problem Analysis
Small and marginal farmers across emerging economies face structural information asymmetry and operational fragmentation:
* **Fragmented Information:** Agrometeorological warnings, soil diagnostics, market price trends, and government subsidies reside in disconnected siloes or non-digitized channels.
* **Low Technical Literacy & High Cognitive Load:** Modern digital tools frequently demand complex numerical literacy or command complex desktop interfaces unsuitable for rural smartphone users.
* **Lack of Timely Diagnostics:** Crop pest infestation and plant disease misdiagnosis lead to inappropriate chemical application, inflated input costs, and yield losses.
* **Financial Invisibility:** Manual expense tracking results in poor cash flow management and difficulty analyzing seasonal farm profitability.
* **Lack of Standardized Interoperability:** Agricultural research and dataset standards vary drastically across developing countries (e.g., India, Brazil, South Africa), impeding cross-regional data sharing, common agricultural policy analysis, and cooperative AI training.

---

## 3. Proposed Solution
KisaanSaathi provides a mobile-first, lightweight progressive web application powered by a serverless Firebase backend and Google's Gemini API ecosystem:
1. **Context-Aware AI Agricultural Assistant:** Uses localized farm profiles (soil type, region, crop history) as dynamic prompt context to answer complex farming queries.
2. **Hybrid Soil Health & Crop Engine:** Combines instant rule-based NPK evaluation with generative crop/fertilizer recommendations.
3. **Natural Pest & Disease Diagnostic Finder:** Computer vision image classifier paired with organic management protocols (Neem, botanical treatments, IPM).
4. **Farm Economics Manager:** Simple income and expense logging categorized by crop cycle with automatic margin calculation.
5. **BRICS Agricultural Data Schema (BADS):** A standardized JSON/Firestore data model ensuring cross-border schema compatibility and localized translation layers.

---

## 4. USP / Potential Differentiators
* **Potential Differentiator 1: Context-Injected Agronomic Chatbot.** Unlike generic chatbots, KisaanSaathi automatically appends the user's active farm profile (pH, location, active crop, budget) into the LLM system context.
* **Potential Differentiator 2: Organic-First Disease Remediation.** Prioritizes bio-pesticides, integrated pest management (IPM), and natural preparations over chemical inputs.
* **Potential Differentiator 3: BRICS Standardized Interoperability Layer.** A pluggable data specification designed to standardize crop telemetry across heterogeneous international data sources.
* **Potential Differentiator 4: Zero-Latency Rule-Based Fallbacks.** Core recommendations (soil and crop math) utilize deterministic local algorithms if AI service endpoints experience latency or failure.

---

## 5. Target Users and Personas

| Persona Attribute | Primary Persona: Ramesh Patel (Smallholder Farmer) | Secondary Persona: Dr. Anita Rao (NGO Field Coordinator) |
| :--- | :--- | :--- |
| **Demographics** | Age 42, 2.5 acres land, Madhya Pradesh | Age 31, Agricultural Extension Officer |
| **Tech Literacy** | Low to Moderate; uses WhatsApp & YouTube; Android user | High; uses spreadsheets, GIS tools, web apps |
| **Core Needs** | Simple soil health insights, pest solutions, disaster alerts, expense log | Aggregate farmer tracking, regional pest monitoring, scheme dissemination |
| **Pain Points** | High fertilizer costs, unexpected weather damage, complex forms | Manual record-keeping, delayed field reports |
| **Platform Usage** | Mobile view, voice inputs, image uploads, visual icons | Desktop view, batch profile review, advisory generation |

---

## 6. User Stories

| ID | As a/an... | I want to... | So that... | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **US-01** | Farmer | Log in securely via Phone OTP or Email/Password | My data remains saved and private across sessions. | P0 |
| **US-02** | Farmer | Enter my soil N-P-K and pH test values | I get immediate crop suggestions and NPK correction steps. | P0 |
| **US-03** | Farmer | Take or upload a picture of an infected crop leaf | I can identify the potential disease and view natural remedies. | P0 |
| **US-04** | Farmer | Ask a voice/text question to the AI assistant | I receive tailored farming advice based on my specific location and farm. | P0 |
| **US-05** | Farmer | Log seed, fertilizer, and labor costs | I can track whether a specific crop harvest yielded a profit or loss. | P0 |
| **US-06** | Farmer | View real-time local weather and extreme warnings | I can schedule irrigation and harvesting safely. | P0 |
| **US-07** | Administrator | Standardize and view farm telemetry | Regional data models can interact across BRICS standards. | P2 |

---

## 7. User Journey

```
[ Unauthenticated User ]
       │
       ▼
┌──────────────────────────────┐
│  Auth Screen (Email / OTP)   │
└──────────────┬───────────────┘
               │ (Authenticates via Firebase Auth)
               ▼
┌──────────────────────────────┐
│ Check Firestore: users/{uid} │
└──────┬────────────────┬──────┘
       │ Profile Exists │ Profile Missing
       ▼                ▼
┌─────────────┐  ┌──────────────────────────────────┐
│  Dashboard  │  │ Onboarding: Name, District, State │
└──────┬──────┘  └────────────────┬─────────────────┘
       │                          │
       │                          ▼
       │         ┌──────────────────────────────────┐
       │         │  Add Initial Farm Profile Data   │
       │         └────────────────┬─────────────────┘
       │                          │
       └──────────────────────────┴────────┐
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   MAIN DASHBOARD                                       │
│  - Weather Widget  - Soil Health Summary  - AI Assistant Quick Access  - Expense Brief │
└──────┬──────────────────┬──────────────────┬──────────────────┬──────────────────┬─────┘
       │                  │                  │                  │                  │
       ▼                  ▼                  ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Soil Module │    │ Crop Module │    │ Pest Finder │    │ Economics   │    │ Weather Alert│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 8. Functional Requirements

* **FR-AUTH-01:** System shall authenticate users via Firebase Authentication using Email/Password and Phone OTP.
* **FR-PROF-01:** System shall automatically create a user profile document in Firestore (`users/{uid}`) upon first successful authentication.
* **FR-FARM-01:** System shall allow a user to store multiple farm records containing land size, soil type, and location.
* **FR-SOIL-01:** System shall compute a deterministic Soil Health Score (0-100) based on optimal target N-P-K, pH, and organic carbon ranges.
* **FR-PEST-01:** System shall accept JPEG/PNG image uploads to Firebase Storage and trigger Gemini Multimodal vision processing for disease identification.
* **FR-ECON-01:** System shall aggregate category-wise farm expenditures and present total cost vs. income net margins.
* **FR-CHAT-01:** AI Chatbot shall inject context parameters (`farmName`, `soilType`, `district`, `state`) into system prompts.
* **FR-BRICS-01:** System shall output exportable standardized JSON formats following the BRICS Agricultural Data Schema (BADS) specification.

---

## 9. Detailed Feature Breakdown

### 9.1 Soil Prediction & Health Diagnostics
* **Purpose:** Convert raw soil test laboratory results into actionable fertilizer and crop decisions.
* **User:** Smallholder farmer or agricultural advisor.
* **Trigger:** Farmer clicks "New Soil Test Entry".
* **Inputs:** N (mg/kg), P (mg/kg), K (mg/kg), pH (3.0–10.0), Organic Carbon (%), Soil Type (Dropdown), District/State.
* **Processing:**
  1. *Primary:* Deterministic rule engine checks optimal agronomic thresholds (e.g., pH 6.0–7.5 ideal for most cereals; N < 140 mg/kg flagged as Low).
  2. *Secondary:* Gemini API receives structured JSON of inputs to formulate personalized organic amendment plans.
* **Outputs:** Health score index, NPK rating status (Low/Medium/High), pH classification, recommended organic treatments (e.g., Farmyard Manure dosages).
* **UI:** Speedometer-style score gauge, color-coded status badges (Red/Yellow/Green), collapsible treatment list.
* **Backend:** Cloud Function `analyzeSoilReport` calculates metrics and writes to `users/{uid}/soilReports/{reportId}`.
* **Firestore Target:** `users/{uid}/soilReports/{reportId}`
* **APIs:** Gemini 2.5 Flash API.
* **AI Integration:** Generative explanation of soil deficiencies.
* **Error Handling:** Out-of-bounds numerical input rejection with client-side field validation.
* **Edge Cases:** Missing optional values (e.g., Organic Carbon unknown) defaults calculation to basic NPK+pH matrix.
* **Priority:** P0

---

### 9.2 Natural Pest & Disease Solution Finder
* **Purpose:** Provide rapid, accessible diagnosis of plant diseases with non-chemical remedy protocols.
* **User:** Farmer observing abnormal leaf spots, wilting, or insect infestation.
* **Trigger:** Farmer uploads leaf photo via camera or gallery upload.
* **Inputs:** Image file (`.jpg`/`.png`), Crop Type (optional dropdown).
* **Processing:**
  1. Frontend uploads image file directly to Firebase Storage (`pest_images/{uid}/{imageId}.jpg`).
  2. Cloud Function passes signed download URL to Gemini Multimodal endpoint with explicit structured prompt.
  3. Prompt mandates output structure: `suspectedDisease`, `confidenceScore`, `organicRemedy`, `disclaimer`.
* **Outputs:** Diagnostic card with confidence rating, "Possible Issue" banner, step-by-step preparation of botanical sprays (Neem Oil, Chili-Garlic extract).
* **UI:** Image preview box, progress spinner, diagnostic findings card with mandatory advisory warning.
* **Backend:** Cloud Function `detectPestDisease`.
* **Firestore Target:** `users/{uid}/diseaseReports/{reportId}`
* **APIs:** Gemini 2.5 Flash (Vision capability), Firebase Storage API.
* **AI Integration:** Multimodal visual diagnosis and step-by-step remedy generation.
* **Error Handling:** Blurry image error response requesting user re-take photo under daylight.
* **Edge Cases:** Non-plant image uploaded triggers system notice: "No agricultural specimen detected. Please upload a clear photo of a crop leaf or stem."
* **Priority:** P0

---

### 9.3 Farm Economics Manager
* **Purpose:** Enable financial literacy and harvest profitability analysis for non-accountant farmers.
* **User:** Farmer managing daily cash flows.
* **Trigger:** Manual entry of expense or income line item.
* **Inputs:** Category (Seeds, Fertilizer, Pesticides, Labor, Machinery, Irrigation, Transport, Sales/Income), Amount ($/₹), Crop Name, Date.
* **Processing:** Client-side sum aggregation; server-side backup computation via Firestore client SDK queries.
* **Outputs:** Monthly cash outflow chart, per-crop net profit/loss summary ($ Net = Total Revenue - Total Expense$).
* **UI:** Clean form, large touch keypads, simple visual bar chart (Green for Income, Red for Expense).
* **Backend:** Direct Firestore SDK write/read operations protected by security rules.
* **Firestore Target:** `users/{uid}/expenses/{expenseId}`
* **APIs:** Recharts / Chart.js for data visualization.
* **AI Integration:** AI Profit Advisor provides textual feedback (e.g., "Labor represents 45% of your total expenditures for Paddy this season").
* **Error Handling:** Prevention of negative currency values in input fields.
* **Edge Cases:** Unassigned crop expense defaults to "General Farm Overhead".
* **Priority:** P0

---

### 9.4 Context-Aware AI Agricultural Assistant
* **Purpose:** Provide 24/7 agricultural Q&A tailored specifically to the farmer's registered land data.
* **User:** Farmer seeking advice on planting schedules, weather anomalies, or crop management.
* **Trigger:** User sends text query or selects quick-prompt suggestion chips.
* **Inputs:** String query + Automatically injected session context (State, Soil Type, Active Farm Crops).
* **Processing:** Cloud Function compiles system message context + conversation history + user query, dispatches request to Gemini API.
* **Outputs:** Structured text response in natural, easy-to-read language.
* **UI:** Conversational chat interface with avatar assistant, audio output toggle (SpeechSynthesis API).
* **Backend:** Cloud Function `chatWithFarmer`.
* **Firestore Target:** `users/{uid}/chats/{chatId}/messages/{messageId}`
* **APIs:** Gemini 2.5 Flash API.
* **AI Integration:** Natural language processing with strict system prompt boundaries.
* **Error Handling:** Network disconnect banner with auto-retry button.
* **Edge Cases:** Out-of-domain queries (e.g., asking for stock market tips or sports scores) return polite refusal redirecting to agriculture.
* **Priority:** P0

---

### 9.5 Weather Intelligence & Early Disaster Warning
* **Purpose:** Provide hyper-local short-term forecasts and actionable extreme weather advisory.
* **User:** Farmer planning daily operations (spraying, harvesting, irrigation).
* **Trigger:** Page load / Geolocation permission grant / Manual district selection.
* **Inputs:** Lat/Lng coordinates or selected District/State.
* **Processing:** Fetches external weather API payload; parses temperature, humidity, precipitation probability, and wind velocity.
* **Outputs:** 5-day forecast strip, agricultural advice (e.g., "High humidity expected: Delay pesticide application to avoid rain washout").
* **UI:** High-contrast weather cards, hazard alert banners for heavy rainfall or extreme temperatures.
* **Backend:** Client-side API fetch with Cloud Function fallback caching.
* **Firestore Target:** Cached client state / Optional store in `users/{uid}/disasterReports`.
* **APIs:** Open-Meteo API / OpenWeatherMap API (Free Tiers).
* **AI Integration:** AI summarizes weather alerts into simplified farmer advisories.
* **Error Handling:** Geolocation denial falls back gracefully to registered profile district/state coordinates.
* **Edge Cases:** Complete weather API outage displays last cached weather entry with timestamp notification.
* **Priority:** P0 (Weather) / P1 (Disaster Alerts)

---

## 10. Non-Functional Requirements

### Performance & Scalability
* **Page Load Time:** First Contentful Paint (FCP) under 1.8 seconds on 3G networks.
* **Bundle Size:** Initial frontend JavaScript bundle size $< 250\text{ KB}$ gzipped.
* **Cloud Functions Execution:** API cold start response time $< 2.0$ seconds; warm response $< 500\text{ ms}$.

### Accessibility & UX
* **Touch Targets:** Minimum touch target size $48\times 48\text{ px}$ across all mobile views.
* **Contrast Ratio:** Minimum WCAG 2.1 AA compliance (4.5:1 ratio for normal text).
* **Localization Readiness:** Dynamic string dictionary architecture supporting instant i18n key translation.

### Reliability & Availability
* **Uptime:** 99.5% service availability guaranteed through Firebase serverless infrastructure.
* **Offline Resilience:** Firestore offline persistence enabled for cached viewing of soil reports and expense records without active network connectivity.

---

## 11. AI/ML Requirements

```
                                  ┌────────────────────────┐
                                  │   User Query / Photo   │
                                  └───────────┬────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │ System Context Inject  │
                                  │ (Soil, Location, Crop) │
                                  └───────────┬────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │ Primary AI Model Call  │
                                  │ (Gemini 2.5 Flash)     │
                                  └───────────┬────────────┘
                                              │
                         ┌────────────────────┴────────────────────┐
                         │                                         │
                 [ Success Status ]                         [ API Failure / Rate Limit ]
                         │                                         │
                         ▼                                         ▼
            ┌────────────────────────┐                ┌────────────────────────┐
            │ Structured JSON Output │                │ Rule-Based Deterministic│
            └────────────┬───────────┘                │ Fallback Engine        │
                         │                            └────────────┬───────────┘
                         │                                         │
                         └────────────────────┬────────────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │  UI Card Rendering +   │
                                  │ Mandatory Advisory     │
                                  └────────────────────────┘
```

| Component | AI Role | Model / API | Fallback Mechanism | Hallucination Prevention Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Agricultural Assistant** | Contextual Q&A | Gemini 2.5 Flash | Pre-stored agronomy FAQ lookup dictionary | Low temperature ($0.2$), explicit system instruction limiting scope strictly to agricultural context |
| **Pest Diagnostics** | Visual Disease ID | Gemini 2.5 Flash (Vision) | Rule-based symptom selection wizard | Soft language output ("Possible issue"), explicit confidence scores, disclaimer banner |
| **Soil Advisor** | Recommendation Engine | Gemini 2.5 Flash | Static NPK reference lookup table | Pre-calculated numerical ranges checked before prompt dispatch |
| **Profit Advisor** | Financial Insights | Gemini 2.5 Flash | Basic statistical calculation (Percentages, Max/Min expenditure) | Mathematical operations performed strictly in code, not LLM |

---

## 12. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                            │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  React / Vite SPA or Modular JavaScript PWA (Mobile-First UI)  │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │
                                    │ HTTPS / Firebase SDK
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           FIREBASE BACKEND                             │
│                                                                        │
│   ┌───────────────────┐  ┌───────────────────┐  ┌──────────────────┐   │
│   │   Firebase Auth   │  │  Cloud Firestore  │  │ Firebase Storage │   │
│   │ (Email / OTP Identity)│  │ (NoSQL Application│  │ (Image Uploads)  │   │
│   └─────────┬─────────┘  │      Database)    │  └────────┬─────────┘   │
│             │            └─────────▲─────────┘           │             │
└─────────────┼──────────────────────┼─────────────────────┼─────────────┘
              │                      │                     │
              │ Authentication Context│ DB Read / Write     │ Upload Triggers
              ▼                      │                     ▼
┌────────────────────────────────────┴───────────────────────────────────┐
│                       SERVERLESS LOGIC LAYER                           │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                    Firebase Cloud Functions                    │   │
│   │   - analyzeSoilReport   - chatWithFarmer   - detectPestDisease │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │
                                    │ Secure API Key / REST
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL API INTEGRATIONS                       │
│                                                                        │
│   ┌───────────────────────┐                 ┌──────────────────────┐   │
│   │   Google Gemini API   │                 │   Weather API        │   │
│   │  (Multimodal / LLM)   │                 │  (Open-Meteo REST)   │   │
│   └───────────────────────┘                 └──────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 13. Recommended Technology Stack

* **Frontend:** React.js (via Vite) or Modular Vanilla JavaScript with Tailwind CSS. (Provides fast modern component rendering, responsive utility styling, and light mobile load overhead).
* **Backend Environment:** Firebase Cloud Functions (Node.js runtime).
* **Database:** Cloud Firestore (Document NoSQL, real-time sync, offline persistence).
* **Authentication:** Firebase Authentication (Supporting Email/Password and Phone OTP providers).
* **File Storage:** Firebase Storage (Secure bucket hosting for user leaf diagnostics photos).
* **AI Engine:** Google GenAI SDK (`@google/genai` using `gemini-2.5-flash`).
* **Hosting:** Firebase Hosting (CDN edge network deployment with direct Cloud Functions routing).
* **Weather API:** Open-Meteo REST API (No rate-limit API key required for non-commercial student prototyping).

---

## 14. Database / Firestore Design

### Core Collections & Document Schema

#### `users/{uid}`
```json
{
  "name": "Ramesh Patel",
  "email": "ramesh@example.com",
  "phone": "+919876543210",
  "state": "Madhya Pradesh",
  "district": "Sehore",
  "language": "hi",
  "createdAt": "2026-03-15T08:00:00Z",
  "updatedAt": "2026-03-15T08:00:00Z"
}
```

#### `users/{uid}/farms/{farmId}`
```json
{
  "farmName": "North Parcel",
  "location": "Sehore West",
  "landSize": 2.5,
  "landUnit": "Acres",
  "soilType": "Black Soil",
  "irrigationType": "Canal / Borewell",
  "createdAt": "2026-03-15T08:30:00Z",
  "updatedAt": "2026-03-15T08:30:00Z"
}
```

#### `users/{uid}/soilReports/{reportId}`
```json
{
  "farmId": "farm123",
  "pH": 6.8,
  "nitrogen": 120,
  "phosphorus": 45,
  "potassium": 210,
  "moisture": 18.5,
  "organicCarbon": 0.55,
  "temperature": 28.0,
  "soilHealthScore": 74,
  "recommendedCrops": ["Wheat", "Soybean", "Chickpea"],
  "deficiencies": ["Low Nitrogen", "Moderate Organic Matter"],
  "recommendations": "Apply 50kg Neem-coated Urea and organic compost prior to sowing.",
  "createdAt": "2026-03-16T10:15:00Z"
}
```

#### `users/{uid}/expenses/{expenseId}`
```json
{
  "farmId": "farm123",
  "crop": "Wheat",
  "category": "Fertilizer",
  "amount": 2500.00,
  "type": "Expense",
  "description": "Purchased 2 bags of DAP",
  "date": "2026-03-10",
  "createdAt": "2026-03-10T11:00:00Z",
  "updatedAt": "2026-03-10T11:00:00Z"
}
```

#### `users/{uid}/diseaseReports/{reportId}`
```json
{
  "farmId": "farm123",
  "crop": "Wheat",
  "symptoms": "Yellow streaks on leaf tips with rust powder",
  "imageUrl": "https://storage.googleapis.com/.../leaf.jpg",
  "suspectedDisease": "Yellow Rust (Puccinia striiformis)",
  "confidence": 0.88,
  "recommendation": "Spray fermented sour buttermilk solution or Neem seed kernel extract (5%). Avoid nitrogen excess.",
  "createdAt": "2026-03-17T14:20:00Z"
}
```

#### `users/{uid}/disasterReports/{reportId}`
```json
{
  "farmId": "farm123",
  "type": "Heavy Rainfall / Hailstorm",
  "location": "Sehore District",
  "severity": "High",
  "description": "Unseasonal hail caused stem breakage in standing wheat crop.",
  "imageUrl": "https://storage.googleapis.com/.../hail_damage.jpg",
  "createdAt": "2026-03-18T09:00:00Z"
}
```

---

## 15. API Requirements

### Internal Cloud Functions APIs

#### `POST /chatWithFarmer`
* **Request:** `{ "uid": "abc123", "message": "My wheat leaves are turning yellow. What should I do?", "farmId": "farm123" }`
* **Response:** `{ "status": "success", "reply": "Based on your Black Soil profile in Sehore, yellowing during this stage often indicates Nitrogen deficiency or Rust infection..." }`

#### `POST /analyzeSoilReport`
* **Request:** `{ "uid": "abc123", "farmId": "farm123", "pH": 6.8, "nitrogen": 120, "phosphorus": 45, "potassium": 210 }`
* **Response:** `{ "status": "success", "soilHealthScore": 74, "deficiencies": ["Low Nitrogen"], "recommendations": "..." }`

#### `POST /detectPestDisease`
* **Request:** `{ "uid": "abc123", "farmId": "farm123", "storagePath": "pest_images/abc123/image1.jpg", "crop": "Wheat" }`
* **Response:** `{ "status": "success", "suspectedDisease": "Yellow Rust", "confidence": 0.88, "organicRemedy": "..." }`

### External APIs
* **Open-Meteo Weather API:** `GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum`
* **Google Gemini API:** `gemini-2.5-flash` model invocation via SDK for multimodal inference.

---

## 16. UI/UX Requirements

* **Visual Identity:** Earthy Green (`#1E5631`), Warm Leaf (`#4C9A2A`), Sunshine Accent (`#E8A838`), Clean Neutral (`#F4F7F4`), Dark Text (`#1A251E`).
* **Typography:** System Sans-Serif font (Inter / Roboto) optimized for legibility at large base sizes ($18\text{px}$).
* **Guiding Character:** "Saathi" — A friendly visual icon badge (illustrated leaf assistant) that highlights action buttons, hints, and error solutions.
* **Layout Grid:** Single-column mobile cards; two-column layout on desktop browsers.

```
┌─────────────────────────────────────────┐
│ ☰ KisaanSaathi       [Saathi Avatar] 🔔 │
├─────────────────────────────────────────┤
│ Welcome back, Ramesh Patel 👋           │
│ 📍 Sehore, MP  |  🌤️ 29°C Partly Cloudy│
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │  SOIL HEALTH SCORE                  │ │
│ │  [ 74 / 100 ] Good Condition        │ │
│ │  Action: Nitrogen booster needed    │ │
│ └─────────────────────────────────────┘ │
│ ┌──────────────────┐ ┌────────────────┐ │
│ │ 📸 Scan Disease  │ │ 💬 Ask Assistant│ │
│ └──────────────────┘ └────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │  FARM PROFIT SUMMARY                │ │
│ │  Income: ₹45,000 | Expense: ₹12,500 │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 17. Complete User Flow

```
[ START: User lands on KisaanSaathi ]
                   │
                   ▼
       [ Is Auth Token Valid? ]
         ├── YES ──► Navigate to /dashboard
         └── NO  ──► Display /login
                        │
                        ▼
            [ Auth Method Selected ]
              ├── Email/Password ──► Firebase Auth Verification
              └── Phone OTP      ──► Send OTP ──► Verify Code
                        │
                        ▼
           [ Fetch user document: users/{uid} ]
             ├── Exists     ──► Redirect to Dashboard
             └── Not Found  ──► Render Setup Profile Page
                                      │
                                      ▼
                        Save profile metadata to Firestore
                                      │
                                      ▼
                             Redirect to Dashboard
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          DASHBOARD NAVIGATION                          │
├───────────────┬───────────────┬────────────────┬───────────────┬───────┤
│               │               │                │               │       │
▼               ▼               ▼                ▼               ▼       ▼
[Soil Module] [Crops Engine] [Pest Diagnostic] [Expenses Log] [Weather] [AI Assistant]
```

---

## 18. Edge Cases and Failure Scenarios

* **Edge Case 1: Intermittent Internet Connection.**
  * *Handling:* Firestore offline persistence caches user input. Transmitted mutations sync automatically upon reconnection. AI calls display an "Offline Mode: AI features require internet connection" banner.
* **Edge Case 2: Blurry or Non-Plant Disease Image Upload.**
  * *Handling:* Gemini vision validation step detects non-plant signatures and returns a friendly prompt: "We couldn't detect plant leaves clearly. Please take a close-up photo in bright light."
* **Edge Case 3: Extreme Value Inputs in Soil Form (e.g., pH = 15 or Nitrogen = -50).**
  * *Handling:* Strict client-side validation schema rejects values outside agronomic ranges ($\text{pH } 3.0-10.0$).
* **Edge Case 4: Gemini API Rate Limit Exceeded (HTTP 429).**
  * *Handling:* System catches 429 status code and falls back to localized rule-based advisory tables without breaking the UI.

---

## 19. Security and Privacy

### Firestore Security Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User Profile Document Access Rules
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      
      // Subcollection Rules (Farms, Soil Reports, Expenses, Disease Reports)
      match /farms/{farmId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
      
      match /soilReports/{reportId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
      
      match /expenses/{expenseId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
      
      match /diseaseReports/{reportId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
      
      match /disasterReports/{reportId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
      
      match /chats/{chatId}/messages/{messageId} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Authentication Data Wiring Specification
```
1. User completes sign-up form on Client.
2. Firebase Authentication handles credentials and creates user record.
3. Client receives auth user object containing unique user ID (user.uid).
4. Client executes initial profile bootstrap:
   db.collection('users').doc(user.uid).set({
     name: formData.name,
     email: user.email,
     phone: user.phoneNumber,
     state: formData.state,
     district: formData.district,
     createdAt: firebase.firestore.FieldValue.serverTimestamp()
   });
5. All subsequent data writes attach directly under users/{user.uid}/... subcollections.
```

---

## 20. Admin Requirements
* **Admin Role Flag:** Stored in user custom claims or as `isAdmin: true` boolean on specific admin documents.
* **Basic Analytics View:** aggregate count of total registered farmers, soil tests conducted, and pest diagnostics generated.
* **Disaster Notice Dispatcher:** Ability to push broadcast alert documents to `systemAlerts` collection for regional banner notifications.

---

## 21. Analytics and KPIs
* **User Engagement:** Daily Active Users (DAU), Monthly Active Users (MAU).
* **Diagnostic Volume:** Total pest photos scanned & disease identification queries processed.
* **Financial Usage:** Total expenses logged per farm profile.
* **AI Quality Metric:** Ratio of positive thumbs-up feedback on AI assistant answers.

---

## 22. MVP Definition
The Minimum Viable Product (MVP) focuses on core functional utility to ensure student developers complete a polished, stable prototype within hackathon deadlines:
* **Included in MVP (P0):**
  * Firebase Authentication (Email + Phone OTP).
  * Profile & Farm Setup.
  * Soil Health Diagnostics Engine (Rule-based + AI summary).
  * Context-Aware AI Chatbot (Gemini 2.5 Flash).
  * Natural Pest & Disease Identifier (Image upload + Gemini Multimodal).
  * Farm Expense & Profitability Manager.
  * Live Weather Widget (Open-Meteo API).
* **Deferred to Post-MVP / Future Iterations (P1/P2/P3):**
  * Interactive 404 agricultural mini-game.
  * Live multi-market commodity API price comparison.
  * BRICS automated data export layer.

---

## 23. Development Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                           DEVELOPMENT ROADMAP                          │
├───────────────────┬───────────────────┬───────────────────┬────────────┤
│ Day 1: Foundation │ Day 2: Core Logic │ Day 3: AI & Visual│ Day 4: Demo│
├───────────────────┼───────────────────┼───────────────────┼────────────┤
│ - Firebase Auth   │ - Soil Diagnostics│ - Gemini Vision ID│ - Demo Data│
│ - Firestore Rules │ - Expense Manager │ - Context Chatbot │ - Scripting│
│ - App Skeleton    │ - Weather API     │ - UI Polish       │ - Deployment│
└───────────────────┴───────────────────┴───────────────────┴────────────┘
```

---

## 24. Team Task Breakdown

| Member Role | Primary Responsibilities | Deliverables |
| :--- | :--- | :--- |
| **Frontend Developer** | UI Components, Tailwind layout, State management | Responsive web UI, navigation, forms, charts |
| **Backend & Firebase Dev**| Auth setup, Firestore schema implementation, Cloud Functions | Security rules, serverless API endpoints, database methods |
| **AI Solution Architect** | Gemini API integration, prompt engineering, multimodal testing | Robust AI functions, fallback logic, system context builders |
| **UX & Product Lead** | Wireframes, color hierarchy, user flow validation, pitch deck | High-fidelity UI styling, demo script, presentation slides |

---

## 25. Testing Strategy
* **Authentication Flow Testing:** Verify sign-up, user creation, session persistence, logout, and security rule blocking of unauthorized paths.
* **Soil Engine Validation:** Run extreme testing inputs ($\text{pH}=3, 7, 10; \text{NPK}=0, 150, 500$) and ensure deterministic rule engine returns valid guidance.
* **AI Endpoint Resilience:** Test behavior when invalid images or empty text payloads are dispatched to Cloud Functions.
* **Mobile Responsiveness:** Validate rendering across standard screen resolutions ($360\text{px}$, $390\text{px}$, $768\text{px}$, $1024\text{px}$).

---

## 26. Deployment Plan
* **Frontend Hosting:** Deployed on Firebase Hosting using Firebase CLI (`firebase deploy --only hosting`).
* **Backend Functions:** Deployed via Firebase Cloud Functions (`firebase deploy --only functions`).
* **Environment Variables:** Gemini API keys stored securely in Cloud Functions environment config (`firebase functions:secrets:set GEMINI_API_KEY`).
* **Domain Setup:** Default SSL-enabled `.web.app` or `.firebaseapp.com` domain.

---

## 27. Cost Analysis
For prototype and hackathon demonstration, total operational cost is **$0.00** using standard free tiers:
* **Firebase Auth:** 10,000 free verification operations/month.
* **Cloud Firestore:** 50,000 reads, 20,000 writes per day free.
* **Firebase Cloud Functions:** 2,000,000 free invocations/month.
* **Google Gemini API:** Free tier allowances available in Google AI Studio for prototype development.
* **Open-Meteo API:** Completely free for non-commercial developmental calls.

---

## 28. Risks and Mitigation

| Risk Event | Severity | Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| Gemini API Latency during Live Demo | High | Medium | Implement local cached responses for common demo queries |
| Phone OTP Rate Limit Reached | High | Low | Pre-configure Firebase Test Phone Numbers for demo credentials |
| Poor Leaf Photo Quality during Scan | Medium | High | Add client-side blur warning & provide sample demo photo buttons |
| Over-ambitious Feature Scope | High | High | Enforce strict P0 MVP list; defer P1/P2 items to pitch slides |

---

## 29. Hackathon Demo Strategy
* **Demo Duration:** 3 to 4 Minutes.
* **Narrative Arc:**
  1. *Introduction (30s):* Introduce Ramesh, a marginal farmer facing yellowing wheat leaves and uncertain fertilizer costs.
  2. *Live Action - Setup (30s):* Login via test account; dashboard loads Ramesh's Black Soil farm in MP with live weather.
  3. *Live Action - Soil & Expenses (60s):* Review soil test analysis ($74/100$), add a $₹1,500$ fertilizer expense, and show instant balance update.
  4. *Live Action - AI Disease Vision (60s):* Upload leaf photo; Gemini Vision diagnoses Yellow Rust with 88% confidence and provides natural Neem remedies.
  5. *Live Action - AI Assistant Query (30s):* Ask voice/text prompt: "When should I apply Neem solution in high humidity?" Assistant answers using live farm context.
  6. *Conclusion & BRICS Vision (30s):* Show exportable standardized data schema ready for cross-border BRICS agricultural collaboration.

---

## 30. Innovation Opportunities
* **BRICS Agricultural Standard Data Schema (BADS):** Establishes standard fields for cross-border agricultural knowledge models (e.g., standardizing soil nutrient metrics between Indian NPK and South African soil parameters).
* **Natural Organic Treatment Repository:** Standardizes non-patentable natural remedies into digitized actionable guides.

---

## 31. Existing Solution / Competitive Analysis

| Parameter | Traditional Ag Extension | Existing Ag Apps | **KisaanSaathi (Proposed)** |
| :--- | :--- | :--- | :--- |
| **Speed of Diagnosis** | Days to Weeks (In-person visit) | Fast (Often generic text search) | **Instant Multimodal AI + Confidence Score** |
| **Context Awareness** | High (Human agent) | Low (Static forms) | **High (Automatic Farm Profile Context)** |
| **Cost Management** | Manual paper log | Complex spreadsheet tools | **Simple Visual Profit/Loss Manager** |
| **Treatment Focus** | Heavy chemical push | Mixed advice | **Organic & Bio-pesticide First** |

---

## 32. BRICS Cooperation Architecture (Future Integration)

To support future cross-border collaboration without claiming current access to official government databases:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   BRICS INTEROPERABILITY LAYER (BADS)                  │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 KisaanSaathi Standard Schema                   │   │
│   │   - Normalized Soil Metrics (pH, N-P-K, Moisture)              │   │
│   │   - Standardized Disease Taxonomy (WOAH / FAO Codes)           │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   LOCALIZED ADAPTATION MODULES                         │
│                                                                        │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌─────────┐ │
│   │ India Module │   │ Brazil Module│   │ SA Module    │   │ ...     │ │
│   └──────────────┘   └──────────────┘   └──────────────┘   └─────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 33. Final Product Definition

* **Product Name:** KisaanSaathi
* **Category:** Smart Agriculture Platform
* **Primary Stack:** Firebase (Auth, Firestore, Cloud Functions, Storage) + React/JS + Gemini 2.5 Flash API.
* **Core Function:** Unified soil health, pest diagnostic, financial logging, and weather intelligence assistant for smallholder farmers.

---

## 34. Buildability Check & Final Scope

### Buildability Rating

| Component | Feasibility Rating | Justification |
| :--- | :--- | :--- |
| Firebase Auth & Profile | **Easy** | Built-in SDK methods, standard user document creation pattern. |
| Firestore Database & Security Rules | **Easy** | Flat document subcollection design with straightforward `auth.uid` rules. |
| Soil Diagnostics & Expense Tracker | **Easy** | Basic mathematical computations and standard CRUD operations. |
| Weather Integration | **Easy** | Public REST API (Open-Meteo) requires no complex authentication. |
| Gemini Context Assistant | **Moderate** | Standard SDK call using engineered system prompts. |
| Gemini Multimodal Pest Scan | **Moderate** | Requires storage upload handling and image payload dispatch to AI endpoint. |
| Cross-Border Live Database Integration | **Very Difficult** | Deferred to future scope; presented conceptually via BADS JSON schema. |

---

### RECOMMENDED FINAL SCOPE (Hackathon Execution)

1. **Authentication:** Email/Password + Firebase Auth.
2. **Dashboard:** Farmer profile banner, location weather summary card, quick action grid.
3. **Soil Health Diagnostic:** Form entry for N, P, K, pH $\rightarrow$ Visual score display + organic recommendations.
4. **Natural Pest Finder:** File/camera image picker $\rightarrow$ Gemini 2.5 Flash vision diagnostic card with confidence & natural remedies.
5. **Farm Economics:** Add Income/Expense form $\rightarrow$ Summary card showing total profit/loss.
6. **AI Assistant:** Chat drawer/modal passing stored farm profile context into Gemini prompts.

---

### "IF I WERE BUILDING THIS AS A STUDENT HACKATHON TEAM"

If I were leading this team, here is the exact chronological sequence to build a winning prototype without getting stuck:

```
[ Step 1: Hour 0 - 4 ]
Setup Firebase Project, initialize Auth & Firestore rules. Build simple responsive UI skeleton.
         │
         ▼
[ Step 2: Hour 4 - 8 ]
Connect Signup/Login flow. Ensure user profile document (users/{uid}) writes successfully upon auth.
         │
         ▼
[ Step 3: Hour 8 - 14 ]
Build Soil Diagnostics & Farm Economics CRUD forms directly reading/writing to Firestore subcollections.
         │
         ▼
[ Step 4: Hour 14 - 20 ]
Implement Firebase Storage upload for crop photos + create Cloud Function calling Gemini 2.5 Flash for vision diagnostics.
         │
         ▼
[ Step 5: Hour 20 - 24 ]
Build AI Assistant chat interface, inject user profile context into Gemini API call.
         │
         ▼
[ Step 6: Hour 24 - 28 ]
Integrate Open-Meteo weather API on the main dashboard.
         │
         ▼
[ Step 7: Hour 28 - 32 ]
Seed 2-3 complete demo accounts with realistic farm records, run through presentation script, and deploy to Firebase Hosting!
```

---

### PRODUCT IN ONE SENTENCE
KisaanSaathi is a mobile-first smart agriculture web application that combines localized soil diagnostics, computer vision pest detection, visual financial tracking, and context-aware AI assistance into a unified portal for smallholder farmers.

### CORE MVP FEATURES
* Firebase Authentication & Farmers Profile Management
* Deterministic & AI-assisted Soil Health Scoring
* Multimodal Crop Pest Diagnostic & Organic Remedy Finder
* Visual Farm Expense & Profitability Tracking Engine
* Real-time Weather Intelligence & Agricultural Guidance
* Context-Injected Agronomic AI Assistant

### MAIN POTENTIAL DIFFERENTIATORS
* Contextual Prompt Injection using stored Firestore farm telemetry
* Natural, Organic-First Botanical Disease Treatment emphasis
* Standalone offline resilience and deterministic rule-based fallbacks
* Standardized BRICS Agricultural Data Schema (BADS) specification

### FINAL TECHNOLOGY STACK
* **Frontend:** React.js / JavaScript (Mobile-First UI) + Tailwind CSS
* **Authentication:** Firebase Authentication (Email/Password & Phone OTP)
* **Database:** Cloud Firestore
* **Storage:** Firebase Storage
* **Serverless Logic:** Firebase Cloud Functions (Node.js)
* **AI Engine:** Google GenAI SDK (`gemini-2.5-flash`)
* **Weather API:** Open-Meteo REST API
* **Hosting:** Firebase Hosting

### FIRESTORE COLLECTION STRUCTURE
* `users/{uid}`
* `users/{uid}/farms/{farmId}`
* `users/{uid}/soilReports/{reportId}`
* `users/{uid}/expenses/{expenseId}`
* `users/{uid}/diseaseReports/{reportId}`
* `users/{uid}/disasterReports/{reportId}`

### MAIN USER FLOW
Sign Up $\rightarrow$ Profile Creation $\rightarrow$ Add Farm Details $\rightarrow$ View Dashboard $\rightarrow$ Run Soil Test OR Upload Leaf Scan OR Log Expense $\rightarrow$ Receive Instant Guidance $\rightarrow$ Consult AI Assistant for Next Steps.

### HACKATHON DEMO FLOW
Log in as Ramesh Patel $\rightarrow$ Review Sehore Farm Dashboard & Weather $\rightarrow$ View Soil Score ($74/100$) $\rightarrow$ Add $₹1,500$ Fertilizer Expense $\rightarrow$ Upload Diseased Wheat Leaf Photo $\rightarrow$ Receive Yellow Rust Diagnosis & Neem Remedy $\rightarrow$ Ask AI Assistant a follow-up voice query $\rightarrow$ Highlight BRICS Data Schema.
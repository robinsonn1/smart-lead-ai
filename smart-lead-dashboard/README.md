# 🚀 Smart Lead AI

An AI-powered **lead qualification and intent scoring system** built with **FastAPI + OpenAI + React dashboard**.

It analyzes incoming customer messages and automatically extracts:

* Intent
* Budget estimation
* Urgency level
* Lead score (1–10)
* Recommended sales action

---

## 🧠 Problem it solves

Businesses receive large volumes of unstructured leads from:

* WhatsApp
* Web forms
* Ads
* Landing pages

Smart Lead AI helps automatically:

* Identify high-quality leads
* Prioritize sales outreach
* Reduce manual qualification work

---

## ⚙️ Architecture

```
Frontend (React + Vite)
        ↓
FastAPI Backend (/analyze)
        ↓
LLM (OpenAI)
        ↓
Structured JSON response
        ↓
React Dashboard UI
```

---

## 🧪 Example Input

```
"I am looking for a car, I have cash and I want something urgent"
```

## 📊 Example Output

```json
{
  "intent": "buying a car",
  "budget": "unknown",
  "urgency": "high",
  "score": 8,
  "recommended_action": "Contact immediately and qualify budget and vehicle type"
}
```

---

## 🖥️ Tech Stack

### Backend

* FastAPI
* Python
* Pydantic
* OpenAI API

### Frontend

* React (Vite)
* Tailwind CSS (optional)
* Fetch API

---

## 🚀 How to run locally

### 1. Clone repo

```bash
git clone https://github.com/robinsonn1/smart-lead-ai.git
cd smart-lead-ai
```

---

### 2. Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Run server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔑 Environment variables

Create a `.env` file in backend:

```
OPENAI_API_KEY=your_api_key_here
```

---

## 📡 API Endpoints

### Health check

```
GET /
```

### Analyze lead

```
POST /analyze
```

Request body:

```json
{
  "message": "string"
}
```

---

## 📸 Features

* AI-powered lead scoring
* Intent detection
* Urgency classification
* Real-time dashboard UI
* Full-stack integration

---

## 📈 Future improvements

* Database (PostgreSQL / SQLite)
* Authentication system
* Lead history dashboard
* CRM integration (HubSpot / Salesforce)
* WhatsApp / Twilio integration
* Deployment (Render + Vercel)

---

## 👨‍💻 Author

Built by Robinson Navarro

---

## ⭐ Goal

Turn raw customer messages into structured, actionable sales intelligence using AI.

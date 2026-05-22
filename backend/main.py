from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm import analyze_with_llm

app = FastAPI(
    title="Smart Lead AI 🚀",
    description="AI-powered lead qualification and intent scoring API",
    version="1.0.0",
)

# Allow frontend connections (React/Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request model
class LeadRequest(BaseModel):
    message: str


# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Smart Lead AI is running 🚀",
        "status": "online",
    }


# Health check endpoint
@app.get("/health")
def health():
    return {
        "status": "ok",
    }


# AI lead analysis endpoint
@app.post("/analyze")
def analyze_lead(lead: LeadRequest):
    try:
        result = analyze_with_llm(lead.message)
        return result

    except Exception as e:
        return {
            "error": str(e),
            "status": "failed",
        }
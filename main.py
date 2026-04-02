from fastapi import FastAPI
from pydantic import BaseModel
from llm import analyze_with_llm

app = FastAPI(title="Smart Lead AI 🚀")


class LeadRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"message": "Smart Lead AI is running 🚀"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
def analyze_lead(lead: LeadRequest):
    result = analyze_with_llm(lead.message)
    return result
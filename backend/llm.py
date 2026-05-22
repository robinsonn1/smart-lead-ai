import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_with_llm(message: str):
    prompt = f"""
You are a strict JSON API.

Analyze this message:

"{message}"

You MUST return ONLY valid JSON.

Use EXACTLY this schema:

{{
  "intent": "string",
  "budget": "low | medium | high | unknown",
  "urgency": "low | medium | high",
  "location": "string",
  "score": number (1-10),
  "recommended_action": "string"
}}

Rules:
- Convert numeric budgets to categories:
  - < 5000 → low
  - 5000–20000 → medium
  - > 20000 → high
- "soon", "ASAP", "urgent" → high urgency
- Always include all fields
- No explanations
- No markdown
- No backticks
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are a strict JSON generator."},
                {"role": "user", "content": prompt}
            ],
            temperature=0
        )

        content = response.choices[0].message.content.strip()

        # 🔍 Parse JSON
        data = json.loads(content)

        # ✅ Enforce schema (very important)
        return {
            "intent": data.get("intent", "unknown"),
            "budget": data.get("budget", "unknown"),
            "urgency": data.get("urgency", "medium"),
            "location": data.get("location", ""),
            "score": int(data.get("score", 5)),
            "recommended_action": data.get(
                "recommended_action", "Follow up with customer"
            )
        }

    except Exception as e:
        return {
            "intent": "unknown",
            "budget": "unknown",
            "urgency": "medium",
            "location": "",
            "score": 5,
            "recommended_action": "Manual review required",
            "error": str(e)
        }
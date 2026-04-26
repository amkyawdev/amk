"""
A-I Backend - FastAPI Application
Burmese AI Assistant Backend with Groq API Integration
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from datetime import datetime, timedelta
import os
import json
import requests
from typing import Optional, List, Dict, Any

# Initialize FastAPI app
app = FastAPI(
    title="A-I Backend",
    description="Burmese AI Assistant Backend API",
    version="1.0.0"
)

# CORS middleware for Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class ChatRequest(BaseModel):
    message: str
    systemPrompt: Optional[str] = ""
    model: Optional[str] = "mixtral-8x7b-32768"
    userId: Optional[str] = "anonymous"

class ChatMessage(BaseModel):
    user_id: str
    message: str
    response: str
    timestamp: datetime

class UserData(BaseModel):
    user_id: str
    email: Optional[str] = ""
    name: Optional[str] = ""
    daily_tokens: int = 0
    daily_speech: int = 0
    last_reset: datetime = datetime.now()

class AuthRequest(BaseModel):
    email: str
    password: str
    name: Optional[str] = ""

# In-memory storage (for demo - use database in production)
users_db: Dict[str, UserData] = {}
chat_history_db: Dict[str, List[ChatMessage]] = {}
daily_limits: Dict[str, Dict[str, int]] = {}

# Groq API configuration - Use HF Token as Bearer token
# For Hugging Face Spaces: Set GROQ_API_KEY in Space secrets
HF_TOKEN = os.getenv("HF_TOKEN", "")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "") or HF_TOKEN
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Burmese system prompt
DEFAULT_SYSTEM_PROMPT = """
သင်သည် မြန်မာ AI အကူဖြစ်သည်။ အောက်ပါအချက်များကို လိုက်နာရန်-
1. မေးခွန်းကို အဓိကထားဖြေဆိုပါ
2. တိတိကျကျ၊ ရှင်းလင်းပြတ်သားစွာ ဖြေပါ
3. Markdown စနစ်ဖြင့် ရေးသားပါ
4. ယဉ်ကျေးသော စကားများသုံးပါ (မင်္ဂလာပါဗျာ၊ ဟုတ်ကဲ့ပါ၊ ခနလေးစောင့်ပေးပါနော်)
5. စကားပြော ၆ စက္ကန့်အတွင်း ပြောရန်
6. ဖိုင် format များ မှန်ကန်စွာ ထုတ်ပေးရန်
7. Project Code များရေးသားနိုင်ရန်
8. ရှင်းလင်းသော ဥပမာများပေးပါ
"""

# Utility functions
def check_and_reset_daily_limits(user_id: str) -> Dict[str, int]:
    """Check and reset daily limits if needed"""
    today = datetime.now().date()
    
    if user_id not in daily_limits:
        daily_limits[user_id] = {"date": str(today), "tokens": 0, "speech": 0}
    
    user_limits = daily_limits[user_id]
    
    if user_limits["date"] != str(today):
        # Reset for new day
        daily_limits[user_id] = {"date": str(today), "tokens": 0, "speech": 0}
    
    return daily_limits[user_id]

def check_token_limit(user_id: str, limit: int = 20) -> bool:
    """Check if user has reached token limit"""
    limits = check_and_reset_daily_limits(user_id)
    return limits["tokens"] < limit

def increment_token_count(user_id: str):
    """Increment token count for user"""
    daily_limits[user_id]["tokens"] += 1

# API Routes
@app.get("/")
async def root():
    """Root endpoint - health check"""
    return {
        "status": "ok",
        "message": "A-I Backend is running",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Chat endpoint - sends message to Groq API and returns streaming response"""
    user_id = request.userId or "anonymous"
    
    # Check token limit
    if not check_token_limit(user_id):
        raise HTTPException(
            status_code=429,
            detail="ယနေ့အတွက် token ကုန်သွားပါပြီ"
        )
    
    # Use custom system prompt or default
    system_prompt = request.systemPrompt or DEFAULT_SYSTEM_PROMPT
    
    # Check if API key is available
    if not GROQ_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GROQ API Key not configured"
        )
    
    # Prepare messages
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": request.message}
    ]
    
    # Make API request to Groq
    try:
        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": request.model or "mixtral-8x7b-32768",
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 1024,
            "stream": True
        }
        
        response = requests.post(
            GROQ_API_URL,
            headers=headers,
            json=payload,
            stream=True,
            timeout=60
        )
        
        if response.status_code != 200:
            error_detail = response.text
            try:
                error_json = response.json()
                error_detail = error_json.get("error", {}).get("message", error_detail)
            except:
                pass
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Groq API Error: {error_detail}"
            )
        
        # Increment token count
        increment_token_count(user_id)
        
        # Return streaming response
        async def generate():
            for line in response.iter_lines():
                if line:
                    line_str = line.decode('utf-8')
                    if line_str.startswith('data: '):
                        data_str = line_str[6:]
                        if data_str == '[DONE]':
                            yield "data: [DONE]\n\n"
                            break
                        try:
                            data = json.loads(data_str)
                            if 'choices' in data and len(data['choices']) > 0:
                                delta = data['choices'][0].get('delta', {})
                                if 'content' in delta:
                                    content = delta['content']
                                    yield f"data: {json.dumps({'content': content})}\n\n"
                        except json.JSONDecodeError:
                            continue
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream"
        )
        
    except requests.exceptions.Timeout:
        raise HTTPException(
            status_code=504,
            detail="Request timeout - please try again"
        )
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Request error: {str(e)}"
        )

@app.post("/api/auth/login")
async def login(request: AuthRequest):
    """User login endpoint"""
    # For demo purposes, accept any credentials
    # In production, implement proper authentication
    user_id = f"user_{hash(request.email)}"
    
    # Check if user exists, if not create new user
    if user_id not in users_db:
        users_db[user_id] = UserData(
            user_id=user_id,
            email=request.email,
            name=request.email.split('@')[0]
        )
    
    return {
        "success": True,
        "token": f"demo_token_{user_id}",
        "user": {
            "id": user_id,
            "email": request.email,
            "name": users_db[user_id].name
        }
    }

@app.post("/api/auth/register")
async def register(request: AuthRequest):
    """User registration endpoint"""
    user_id = f"user_{hash(request.email)}"
    
    # Check if user already exists
    if user_id in users_db:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )
    
    # Create new user
    users_db[user_id] = UserData(
        user_id=user_id,
        email=request.email,
        name=request.name or request.email.split('@')[0]
    )
    
    return {
        "success": True,
        "token": f"demo_token_{user_id}",
        "user": {
            "id": user_id,
            "email": request.email,
            "name": users_db[user_id].name
        }
    }

@app.get("/api/user/{user_id}")
async def get_user(user_id: str):
    """Get user profile"""
    if user_id not in users_db:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    user = users_db[user_id]
    return {
        "id": user.user_id,
        "email": user.email,
        "name": user.name
    }

@app.get("/api/user/{user_id}/limits")
async def get_limits(user_id: str):
    """Get user daily limits"""
    limits = check_and_reset_daily_limits(user_id)
    return {
        "tokens": limits["tokens"],
        "speech_seconds": limits["speech"],
        "token_limit": 20,
        "speech_limit": 20
    }

@app.get("/api/chat/history/{user_id}")
async def get_chat_history(user_id: str):
    """Get user's chat history"""
    history = chat_history_db.get(user_id, [])
    return {
        "history": [
            {
                "message": msg.message,
                "response": msg.response,
                "timestamp": msg.timestamp.isoformat()
            }
            for msg in history[-50:]  # Return last 50 messages
        ]
    }

@app.delete("/api/chat/history/{user_id}")
async def clear_chat_history(user_id: str):
    """Clear user's chat history"""
    if user_id in chat_history_db:
        chat_history_db[user_id] = []
    return {"success": True, "message": "Chat history cleared"}

# Run with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
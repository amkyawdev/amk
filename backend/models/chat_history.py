"""
Chat History Model for A-I Backend
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


class ChatMessage(BaseModel):
    """Individual chat message model"""
    id: Optional[int] = None
    user_id: str
    message: str
    response: Optional[str] = ""
    timestamp: datetime = datetime.now()
    model: Optional[str] = "mixtral-8x7b-32768"
    tokens_used: Optional[int] = 0


class ChatSession(BaseModel):
    """Chat session model"""
    id: Optional[int] = None
    user_id: str
    title: Optional[str] = "New Chat"
    messages: List[ChatMessage] = []
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    is_active: bool = True


class ChatHistoryExport(BaseModel):
    """Export format for chat history"""
    user_id: str
    export_date: datetime = datetime.now()
    sessions: List[ChatSession]
    total_messages: int
    total_tokens: int


class ChatStats(BaseModel):
    """Statistics for user's chat activity"""
    user_id: str
    total_sessions: int = 0
    total_messages: int = 0
    total_tokens: int = 0
    daily_tokens: int = 0
    last_activity: Optional[datetime] = None


def format_chat_message(message: str, response: str, user_id: str) -> ChatMessage:
    """Create a formatted chat message"""
    return ChatMessage(
        user_id=user_id,
        message=message,
        response=response,
        timestamp=datetime.now()
    )


def calculate_tokens(text: str) -> int:
    """Estimate token count for text (rough approximation)"""
    # Rough estimation: ~4 characters per token for Burmese text
    return len(text) // 4 + 1
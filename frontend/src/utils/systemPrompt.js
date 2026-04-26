/**
 * System Prompt Loader
 * Loads and manages AI system prompts for the A-I Chatbot
 */

import chatPrompt from '../system_prompt/chat-system-prompt.md?raw';
import codePrompt from '../system_prompt/code-system-prompt.md?raw';

// Parse markdown to plain text (strip headers, code blocks markers)
function parseMarkdown(text) {
  return text
    // Remove markdown headers (#)
    .replace(/^#+\s+/gm, '')
    // Remove code block fences
    .replace(/```\w*\n/g, '\n')
    .replace(/```/g, '')
    // Clean up bullet points while keeping content
    .replace(/^[-*•]\s+/gm, '')
    // Remove table formatting
    .replace(/\|/g, '')
    .replace(/^[-=]+\s*$/gm, '')
    // Clean up emphasis markers while keeping content
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    // Clean up horizontal rules
    .replace(/^---+$/gm, '')
    // Remove emoji markers that aren't readable
    .replace(/\p{Extended_Pictographic}/gu, '')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Get Chat Agent Prompt
export function getChatPrompt() {
  return parseMarkdown(chatPrompt);
}

// Get Code Developer Agent Prompt  
export function getCodePrompt() {
  return parseMarkdown(codePrompt);
}

// Combined intelligent prompt - switches between chat and code modes
export function getIntelligentPrompt() {
  const chat = getChatPrompt();
  const code = getCodePrompt();
  
  return `${chat}

---

## Code Development Mode

When the user asks about coding, programming, or technical questions, switch to Developer mode:

${code}

---

## Mode Switching Logic

- If user asks about code, programming, debugging → Use Developer Mode
- For general questions, conversations → Use Chat Mode
- The AI should seamlessly switch between modes based on user intent`;
}

// Detect if message is code-related
export function isCodeRelated(message) {
  const codeKeywords = [
    'code', 'programming', 'python', 'javascript', 'java', 'react', 'api',
    'function', 'class', 'debug', 'error', 'fix', 'syntax', 'implement',
    'how to build', 'how to create', 'how to make', 'tutorial', 'code အောက်င့်',
    'ပရိုဂရမ်းန်းခါး', 'ဖန်တီးနည်း', 'ပြုလုပ်နည်း',
    'react', 'fastapi', 'nodejs', 'html', 'css', 'database', 'sql'
  ];
  
  const lower = message.toLowerCase();
  return codeKeywords.some(keyword => lower.includes(keyword));
}

// Get appropriate prompt based on message content
export function getAppropriatePrompt(message) {
  if (isCodeRelated(message)) {
    return getCodePrompt();
  }
  return getChatPrompt();
}

export default {
  getChatPrompt,
  getCodePrompt,
  getIntelligentPrompt,
  isCodeRelated,
  getAppropriatePrompt
};
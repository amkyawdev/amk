import { getAppropriatePrompt, isCodeRelated } from './systemPrompt';

const API_URL = '/api/chat';

class GroqAPI {
  /**
   * Send message to AI with appropriate system prompt
   * Automatically selects Chat or Code mode based on message content
   */
  async sendMessage(message, customSystemPrompt = '') {
    // Auto-detect appropriate prompt if no custom prompt provided
    if (!customSystemPrompt) {
      customSystemPrompt = getAppropriatePrompt(message);
    }
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: customSystemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content;
      }
      
      if (data.error) console.error('API error:', data.error);
    } catch (e) {
      console.error('Error:', e);
    }
    
    return 'Sorry, could not process message.';
  }

  /**
   * Send message with streaming response
   * Returns the full response text
   */
  async sendMessageStreaming(message, onChunk, systemPrompt = '') {
    if (!systemPrompt) {
      systemPrompt = getAppropriatePrompt(message);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1024,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              fullResponse += parsed.content;
              onChunk?.(parsed.content);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    return fullResponse;
  }

  /**
   * Get chat-specific system prompt
   */
  getChatPrompt() {
    return getAppropriatePrompt(''); // Returns default chat prompt
  }

  /**
   * Get code developer system prompt
   */
  getCodePrompt() {
    // Import dynamically to avoid issues
    return 'Developer mode for coding assistance';
  }

  async voiceToText(audioBlob) { return ''; }
  async getUserLimits(userId) { return { tokens: 20, speech_seconds: 20 }; }
}

export const groqAPI = new GroqAPI();
export default groqAPI;

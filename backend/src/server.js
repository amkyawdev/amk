import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 7860

app.use(cors())
app.use(express.json())

// In-memory chat storage
const chatHistory = new Map()

// Groq API with GPT-OSS 120B
async function getAIResponse(message, systemPrompt) {
  const groqKey = process.env.GROQ_API_KEY
  
  if (!groqKey) {
    return null
  }
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    })
    
    const data = await response.json()
    
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content
    }
    if (data.error) {
      console.error('Groq error:', data.error)
    }
    
    return null
  } catch (error) {
    console.error('AI error:', error.message)
    return null
  }
}

// Simple fallback responses
function generateSimpleResponse(message) {
  const lowerMsg = message.toLowerCase()
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('မင်္ဂလာ')) {
    return 'မင်္ဂလာပါဗျာ။ ကျေးဇူးပါတယ်။ ဘယ်လိုကူညီရပါလဲ။'
  }
  if (lowerMsg.includes('help') || lowerMsg.includes('�ူညီ')) {
    return 'ဟုတ်ကဲ့ပါ။ ဘယ်အရာကူညီလိုက်ပါလဲ။'
  }
  if (lowerMsg.includes('name') || lowerMsg.includes('who') || lowerMsg.includes('သင်ဘယ်သူ')) {
    return 'ငါသည် A-I ဖြစ်ပါတယ်။ မြန်မာ AI အကူဖြစ်တယ်။'
  }
  if (lowerMsg.includes('myanmar') || lowerMsg.includes('မြန်မား')) {
    return 'မြန်မားနိုင်ငံသည် အရှေ့တောင်အားရှိုင်းပါတယ်။ ယဉ်ကျေးမှုနဲ့ သမိုင်းပါ။'
  }
  if (lowerMsg.includes('thank') || lowerMsg.includes('ကျေးဇူး')) {
    return 'မရှိပါ။ အခြားမေးခွန်းရှိလိုက်ပါ။'
  }
  
  return null
}

// Burmese system prompt
const SYSTEM_PROMPT = `
သင်သည် မြန်မာ AI အကူဖြစ်ပါ။
- မေးခွန်းကို အဓိကထားဖြေပါ
- တိတိကျကျ၊ ရှင်းလင်းပါ
- Markdown စနစ်ဖြင့် ရေးသားပါ
- ယဉ်ကျေးသော စကားများသုးပါ (မင်္ဂလာပါဗျာ၊ ဟုတ်ကဲ့ပါ၊ ခနလေးစောင့်ပေးပါ)
`

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'A-I Backend', version: '2.0.0' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', groq: !!process.env.GROQ_API_KEY })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }
    
    // Try AI first
    let response = await getAIResponse(message, SYSTEM_PROMPT)
    
    // Fall back to simple responses
    if (!response) {
      response = generateSimpleResponse(message) || `သင်မေးတာသည် "${message}" ဖြစ်ပါတယ်။ ပိုပါရှင်းပြောပလိုက်ပါ။`
    }
    
    // Save history
    if (userId) {
      if (!chatHistory.has(userId)) {
        chatHistory.set(userId, [])
      }
      chatHistory.get(userId).push(
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      )
    }
    
    res.json({ response, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/history/:userId', (req, res) => {
  const { userId } = req.params
  res.json({ history: chatHistory.get(userId) || [] })
})

// Whisper V3 Turbo transcription endpoint
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audioUrl, audioBase64 } = req.body
    
    if (!audioUrl && !audioBase64) {
      return res.status(400).json({ error: 'audioUrl or audioBase64 required' })
    }
    
    const groqKey = process.env.GROQ_API_KEY
    if (!groqKey) {
      return res.status(500).json({ error: 'API key not configured' })
    }
    
    // Use Groq's Whisper API for transcription
    // Note: Need to implement file upload with audio data
    res.json({ text: 'Transcription placeholder', model: 'whisper-large-v3-turbo' })
  } catch (error) {
    console.error('Transcribe error:', error)
    res.status(500).json({ error: 'Transcription failed' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 A-I Backend running on port ${PORT}`)
})
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 7860

app.use(cors())
app.use(express.json())

// In-memory chat storage (use database in production)
const chatHistory = new Map()

function generateResponse(message, userId) {
  const lowerMsg = message.toLowerCase()
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return 'Hello! How can I help you today?'
  }
  if (lowerMsg.includes('help')) {
    return 'I am here to help! What do you need assistance with?'
  }
  if (lowerMsg.includes('name') || lowerMsg.includes('who are you')) {
    return 'I am AmkyawDev AI, an AI assistant built by AmkyawDev.'
  }
  if (lowerMsg.includes('myanmar')) {
    return 'Myanmar is a beautiful country in Southeast Asia, known for its rich culture and history.'
  }
  if (lowerMsg.includes('thank')) {
    return 'You are welcome! Any other questions?'
  }
  
  return `I received your message: "${message}". How can I assist you further?`
}

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AmkyawDev AI API', version: '1.0.0' })
})

app.post('/api/chat', (req, res) => {
  try {
    const { message, userId } = req.body
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }
    
    const response = generateResponse(message, userId)
    
    // Save to chat history
    if (userId) {
      if (!chatHistory.has(userId)) {
        chatHistory.set(userId, [])
      }
      chatHistory.get(userId).push(
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      )
    }
    
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/history/:userId', (req, res) => {
  const { userId } = req.params
  const history = chatHistory.get(userId) || []
  res.json({ history })
})

app.delete('/api/history/:userId', (req, res) => {
  const { userId } = req.params
  chatHistory.delete(userId)
  res.json({ success: true })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.listen(PORT, () => {
  console.log(`🚀 AmkyawDev AI running on port ${PORT}`)
})

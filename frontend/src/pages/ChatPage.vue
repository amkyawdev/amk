<template>
  <div class="chat-page">
    <header class="header">
      <h1 class="title">AmkyawDev AI</h1>
      <nav class="nav">
        <router-link to="/docs">Docs</router-link>
        <router-link to="/api">API</router-link>
        <button @click="logout" class="btn-logout">Logout</button>
      </nav>
    </header>
    <main class="chat-main">
      <div class="messages" ref="messagesContainer">
        <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.role]">
          <div class="message-avatar">{{ msg.role === 'user' ? 'U' : 'AI' }}</div>
          <div class="message-content">{{ msg.content }}</div>
        </div>
        <div v-if="loading" class="message assistant">
          <div class="message-avatar">AI</div>
          <div class="message-content typing">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
      <div class="input-area">
        <input v-model="input" @keyup.enter="send" placeholder="Type your message..." class="input" :disabled="loading" />
        <button @click="send" class="btn-send" :disabled="loading">{{ loading ? '...' : 'Send' }}</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const input = ref('')
const loading = ref(false)
const messagesContainer = ref(null)

const messages = ref([
  { role: 'assistant', content: 'Hello! I am AmkyawDev AI. How can I help you today?' }
])

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const send = async () => {
  if (!input.value.trim() || loading.value) return
  
  const userMessage = input.value.trim()
  messages.value.push({ role: 'user', content: userMessage })
  input.value = ''
  loading.value = true
  scrollToBottom()
  
  // Get user ID
  const userId = firebase.auth().currentUser?.uid || 'guest'
  
  try {
    const response = await fetch('https://amkyawdev-amkyaw-ai-backend.hf.space/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, userId })
    })
    
    const data = await response.json()
    messages.value.push({ role: 'assistant', content: data.response })
  } catch (error) {
    messages.value.push({ role: 'assistant', content: 'Sorry, something went wrong. Please try again.' })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}

const logout = () => {
  firebase.auth().signOut()
  router.push('/login')
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-page { min-height: 100vh; background: #0a0a0a; display: flex; flex-direction: column; }
.header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid #1a1a1a; }
.title { font-size: 24px; font-weight: 700; color: #10b981; }
.nav { display: flex; gap: 24px; align-items: center; }
.nav a { color: #888; text-decoration: none; font-size: 14px; }
.nav a:hover { color: #fff; }
.btn-logout { background: none; border: 1px solid #333; color: #888; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 14px; }
.btn-logout:hover { border-color: #555; color: #fff; }
.chat-main { flex: 1; display: flex; flex-direction: column; max-width: 800px; margin: 0 auto; width: 100%; padding: 20px; }
.messages { flex: 1; overflow-y: auto; padding: 20px 0; }
.message { display: flex; gap: 12px; margin-bottom: 16px; }
.message.user { flex-direction: row-reverse; }
.message-avatar { width: 36px; height: 36px; border-radius: 8px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #10b981; flex-shrink: 0; }
.message.user .message-avatar { background: #10b981; color: #000; }
.message-content { max-width: 70%; padding: 12px 16px; border-radius: 12px; background: #1a1a1a; font-size: 14px; line-height: 1.5; word-wrap: break-word; }
.message.user .message-content { background: #10b981; color: #000; }
.typing { display: flex; gap: 4px; padding: 12px 16px; }
.dot { width: 6px; height: 6px; background: #666; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; }
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
.input-area { display: flex; gap: 12px; padding: 20px 0; border-top: 1px solid #1a1a1a; }
.input { flex: 1; padding: 14px 20px; border-radius: 12px; border: 1px solid #1a1a1a; background: #0a0a0a; color: #fff; font-size: 14px; }
.input:focus { outline: none; border-color: #10b981; }
.input:disabled { opacity: 0.6; }
.btn-send { padding: 14px 28px; border-radius: 12px; border: none; background: #10b981; color: #000; font-size: 14px; font-weight: 600; cursor: pointer; }
.btn-send:hover { background: #059669; }
.btn-send:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
<template>
  <div class="chat-page">
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
        <label class="btn-upload">
          <input type="file" @change="handleFile" accept="image/*,.pdf,.doc,.docx,.txt" hidden />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
        </label>
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

const handleFile = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const fileType = file.type.split('/')[0]
  const isImage = fileType === 'image'
  
  messages.value.push({ 
    role: 'user', 
    content: `[${isImage ? 'Image' : 'File'}: ${file.name}]`,
    fileUrl: isImage ? URL.createObjectURL(file) : null 
  })
  scrollToBottom()
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
.chat-main { flex: 1; display: flex; flex-direction: column; max-width: 800px; margin: 0 auto; width: 100%; padding: 16px; box-sizing: border-box; }
.messages { flex: 1; overflow-y: auto; padding: 16px 0; }
.message { display: flex; gap: 10px; margin-bottom: 14px; max-width: 100%; }
.message.user { flex-direction: row-reverse; }
.message-avatar { width: 32px; height: 32px; border-radius: 8px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #10b981; flex-shrink: 0; }
.message.user .message-avatar { background: #10b981; color: #000; }
.message-content { max-width: 80%; padding: 10px 14px; border-radius: 12px; background: #1a1a1a; font-size: 14px; line-height: 1.5; word-wrap: break-word; }
.message.user .message-content { background: #10b981; color: #000; }
.typing { display: flex; gap: 4px; padding: 12px 16px; }
.dot { width: 6px; height: 6px; background: #666; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; }
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
.input-area { display: flex; gap: 10px; padding: 16px 0; border-top: 1px solid #1a1a1a; align-items: center; }
.btn-upload { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; border: 1px solid #1a1a1a; background: #0a0a0a; color: #666; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
.btn-upload:hover { border-color: #10b981; color: #10b981; }
.input { flex: 1; padding: 12px 16px; border-radius: 10px; border: 1px solid #1a1a1a; background: #0a0a0a; color: #fff; font-size: 14px; min-width: 0; }
.input:focus { outline: none; border-color: #10b981; }
.input:disabled { opacity: 0.6; }
.btn-send { padding: 12px 20px; border-radius: 10px; border: none; background: #10b981; color: #000; font-size: 14px; font-weight: 600; cursor: pointer; flex-shrink: 0; white-space: nowrap; }
.btn-send:hover { background: #059669; }
.btn-send:disabled { opacity: 0.6; cursor: not-allowed; }

@media (max-width: 480px) {
  .chat-main { padding: 12px; }
  .message-content { max-width: 75%; padding: 8px 12px; font-size: 13px; }
  .message-avatar { width: 28px; height: 28px; font-size: 11px; }
  .input-area { gap: 8px; padding: 12px 0; }
  .input { padding: 10px 14px; font-size: 13px; }
  .btn-send { padding: 10px 16px; font-size: 13px; }
}
</style>
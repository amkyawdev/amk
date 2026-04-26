<template>
  <div class="app">
    <nav class="navbar" v-if="!hideNavbar">
      <router-link to="/" class="nav-logo">AmkyawDev AI</router-link>
      <div class="nav-links">
        <router-link to="/docs">Docs</router-link>
        <router-link to="/api">API</router-link>
        <router-link to="/about">About</router-link>
        <template v-if="user">
          <router-link to="/chat" class="btn-chat">Chat</router-link>
          <button @click="logout" class="btn-logout">Logout</button>
        </template>
        <router-link v-else to="/login" class="btn-login">Login</router-link>
      </div>
    </nav>
    <router-view class="page-content" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Reactive user state
const user = ref(null)

onMounted(() => {
  if (typeof firebase !== 'undefined') {
    firebase.auth().onAuthStateChanged((u) => {
      user.value = u
    })
  }
})

const logout = async () => {
  if (typeof firebase !== 'undefined') {
    await firebase.auth().signOut()
  }
  user.value = null
  router.push('/login')
}

const isAuthPage = computed(() => route.path === '/login' || route.path === '/register')
const hideNavbar = computed(() => false)
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fff; overflow-x: hidden; }
.app { min-height: 100vh; display: flex; flex-direction: column; }
.navbar { position: fixed; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #0a0a0a; border-bottom: 1px solid #1a1a1a; z-index: 1000; }
.page-content { flex: 1; padding-top: 50px; }
.nav-logo { font-size: 16px; font-weight: 700; color: #10b981; text-decoration: none; }
.nav-links { display: flex; gap: 16px; align-items: center; }
.nav-links a { color: #666; text-decoration: none; font-size: 13px; }
.nav-links a:hover { color: #fff; }
.btn-login { background: #10b981; color: #000 !important; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; }
.btn-chat { background: #10b981; color: #000 !important; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; }
.btn-logout { background: #ef4444; color: #fff !important; padding: 6px 12px; border-radius: 6px; font-weight: 600; font-size: 13px; border: none; cursor: pointer; }
.btn-logout:hover { background: #dc2626; }

@media (max-width: 480px) {
  .navbar { padding: 10px 12px; }
  .nav-logo { font-size: 14px; }
  .nav-links { gap: 10px; }
  .nav-links a { font-size: 12px; }
  .btn-login, .btn-chat, .btn-logout { padding: 5px 10px; font-size: 12px; }
}
</style>
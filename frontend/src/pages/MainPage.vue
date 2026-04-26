<template>
  <div class="main-page">
    <Navbar />
    <main class="content">
      <div class="hero">
        <h2 class="hero-title">AI Assistant for Everyone</h2>
        <p class="hero-text">Your AI assistant powered by advanced language models</p>
        <div class="buttons">
          <router-link to="/login" class="btn btn-primary">Get Started</router-link>
          <router-link to="/docs" class="btn btn-secondary">Learn More</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.main-page { min-height: 100vh; background: #0a0a0a; display: flex; align-items: center; justify-content: center; }
.content { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 40px; }
.hero { text-align: center; max-width: 600px; }
.hero-title { font-size: 48px; font-weight: 700; margin-bottom: 16px; background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-text { font-size: 18px; color: #666; margin-bottom: 32px; }
.buttons { display: flex; gap: 16px; justify-content: center; }
.btn { padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500; transition: all 0.2s; }
.btn-primary { background: #10b981; color: #000; }
.btn-primary:hover { background: #059669; }
.btn-secondary { background: #1a1a1a; color: #fff; border: 1px solid #333; }
.btn-secondary:hover { border-color: #555; }
</style>
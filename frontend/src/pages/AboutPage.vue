<template>
  <div class="about-page">
    <Navbar />
    <main class="content">
      <h2 class="page-title">About</h2>
      <div class="section">
        <h3>What is AmkyawDev AI?</h3>
        <p>AmkyawDev AI is an AI assistant powered by advanced language models.</p>
        <p>Built with modern technology for the best experience.</p>
      </div>
      <div class="section">
        <h3>Creator</h3>
        <p>Created by a passionate developer.</p>
        <p>Contact us at hello@amkyawdev.ai</p>
      </div>
      <div class="section">
        <h3>License</h3>
        <p>MIT License.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.about-page { min-height: 100vh; background: #0a0a0a; }
.content { max-width: 800px; margin: 0 auto; padding: 60px 40px; }
.page-title { font-size: 36px; font-weight: 700; margin-bottom: 40px; color: #10b981; }
.section { background: #111; padding: 24px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #1a1a1a; }
.section h3 { font-size: 20px; margin-bottom: 12px; color: #fff; }
.section p { color: #888; line-height: 1.6; margin-bottom: 8px; }
</style>
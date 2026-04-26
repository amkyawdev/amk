<template>
  <div class="docs-page">
    <Navbar />
    <main class="content">
      <h2 class="page-title">Documentation</h2>
      <div class="doc-section">
        <h3>Overview</h3>
        <p>AmkyawDev AI is an AI assistant powered by advanced language models.</p>
        <p>Built with modern technology for the best experience.</p>
      </div>
      <div class="doc-section">
        <h3>Features</h3>
        <ul>
          <li>Natural Language Processing</li>
          <li>Interactive Chat</li>
          <li>RESTful API</li>
          <li>Secure Authentication</li>
        </ul>
      </div>
      <div class="doc-section">
        <h3>Getting Started</h3>
        <p>Free to use. Create an account to get started.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.docs-page { min-height: 100vh; background: #0a0a0a; }
.content { max-width: 800px; margin: 0 auto; padding: 60px 40px; }
.page-title { font-size: 36px; font-weight: 700; margin-bottom: 40px; color: #10b981; }
.doc-section { background: #111; padding: 24px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #1a1a1a; }
.doc-section h3 { font-size: 20px; margin-bottom: 12px; color: #fff; }
.doc-section p { color: #888; line-height: 1.6; margin-bottom: 8px; }
.doc-section ul { list-style: none; color: #888; padding-left: 0; }
.doc-section li { padding: 8px 0; }
</style>
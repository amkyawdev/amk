<template>
  <div class="api-page">
    <Navbar />
    <main class="content">
      <h2 class="page-title">API Reference</h2>
      <div class="endpoint">
        <div class="method">POST</div>
        <div class="path">/api/chat</div>
        <p class="desc">Send a chat message.</p>
        <div class="code"><pre>curl -X POST https://api.amkyawdev.ai/chat -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_API_KEY" -d '{"message": "Hello!"}'</pre></div>
      </div>
      <div class="endpoint">
        <div class="method">POST</div>
        <div class="path">/api/auth/login</div>
        <p class="desc">Login to your account.</p>
        <div class="code"><pre>curl -X POST https://api.amkyawdev.ai/auth/login -H "Content-Type: application/json" -d '{"email": "user@email.com", "password": "password"}'</pre></div>
      </div>
      <div class="endpoint">
        <div class="method">GET</div>
        <div class="path">/api/user/profile</div>
        <p class="desc">Get user profile.</p>
        <div class="code"><pre>curl -X GET https://api.amkyawdev.ai/user/profile -H "Authorization: Bearer YOUR_API_KEY"</pre></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.api-page { min-height: 100vh; background: #0a0a0a; }
.content { max-width: 800px; margin: 0 auto; padding: 60px 40px; }
.page-title { font-size: 36px; font-weight: 700; margin-bottom: 40px; color: #10b981; }
.endpoint { background: #111; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #1a1a1a; }
.method { display: inline-block; background: #10b981; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-right: 12px; }
.path { font-family: monospace; font-size: 14px; color: #fff; }
.desc { color: #666; margin: 12px 0; font-size: 14px; }
.code { background: #0a0a0a; padding: 16px; border-radius: 8px; overflow-x: auto; }
.code pre { font-family: monospace; font-size: 13px; color: #888; margin: 0; }
</style>
import { createRouter, createWebHistory } from 'vue-router'
import GetStarted from './pages/GetStarted.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import ResetPassword from './pages/ResetPassword.vue'
import MainPage from './pages/MainPage.vue'
import ChatPage from './pages/ChatPage.vue'
import ApiPage from './pages/ApiPage.vue'
import DocsPage from './pages/DocsPage.vue'
import AboutPage from './pages/AboutPage.vue'
import { useUserStore } from './stores/user'

const routes = [
  { path: '/', name: 'GetStarted', component: GetStarted },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/reset', name: 'ResetPassword', component: ResetPassword },
  { path: '/main', name: 'MainPage', component: MainPage, meta: { requiresAuth: true } },
  { path: '/chat', name: 'ChatPage', component: ChatPage, meta: { requiresAuth: true } },
  { path: '/api', name: 'ApiPage', component: ApiPage },
  { path: '/docs', name: 'DocsPage', component: DocsPage },
  { path: '/about', name: 'AboutPage', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register' || to.path === '/') && userStore.isLoggedIn) {
    next('/main')
  } else {
    next()
  }
})

export default router

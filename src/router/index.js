import DevView from '@/views/DevView.vue'
import HomeView from '@/views/HomeView.vue'
import PromptView from '@/views/PromptView.vue'
import SummaryView from '@/views/SummaryView.vue'
import TouchingView from '@/views/TouchingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: 'prompt', component: PromptView, name: 'prompt' },
        { path: 'select', component: TouchingView },
        { path: 'summary', component: SummaryView },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dev',
      name: 'dev',
      component: DevView,
    },
  ],
})

export default router

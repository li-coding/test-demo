import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView/DashboardView.vue'),
        },
        {
          path: '/test-case',
          name: 'test-case',
          component: () => import('@/views/TestCaseView/TestCaseView.vue'),
        },
      ],
    },
  ],
})

export default router

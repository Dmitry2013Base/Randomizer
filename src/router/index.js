import { createRouter, createWebHistory } from 'vue-router'
import RandomNumberView from '@/views/RandomNumberView.vue'
import RandomPasswordView from '@/views/RandomPasswordView.vue'
import FortuneWheelView from '@/views/FortuneWheelView.vue'
import CubeView from '@/views/CubeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: RandomNumberView
    },
    {
      path: '/number',
      name: 'number',
      component: RandomNumberView
    },
    {
      path: '/password',
      name: 'password',
      component: RandomPasswordView
    },
    {
      path: '/fortune',
      name: 'fortune',
      component: FortuneWheelView
    },
    {
      path: '/cube',
      name: 'cube',
      component: CubeView
    },
  ]
})

export default router

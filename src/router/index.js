import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/home/index.vue'
import MainToRender from '@/pages/process-communication/mainToRender.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/mainToRender', component: MainToRender },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
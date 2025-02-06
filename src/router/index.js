import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/home/index.vue'
import RenderToMain from '@/pages/process-communication/renderToMain.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/renderToMain', component: RenderToMain },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
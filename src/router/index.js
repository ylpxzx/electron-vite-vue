import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/home/index.vue'
import RenderToMain from '@/pages/process-communication/renderToMain.vue'
import RenderToMainTwoWay from '@/pages/process-communication/renderToMainTwoWay.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/renderToMain', component: RenderToMain },
  { path: '/renderToMainTwoWay', component: RenderToMainTwoWay },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
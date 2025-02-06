import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/home/index.vue'
import SettingsView from '@/pages/settings/index.vue'
import EmptyView from '@/pages/empty/index.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/settings', component: SettingsView },
  { path: '/empty', component: EmptyView },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
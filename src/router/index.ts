import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StartPage from '../components/Start/Start.vue'
import MainPage from '../components/Main/Main.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'StartPage',
    component: StartPage
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createWebHistory, createRouter } from 'vue-router'

import Feature from '../views/feature/index.vue'
import Terrain from '../views/terrain/index.vue'

const routes = [
  { path: '/feature', component: Feature },
  { path: '/terrain', component: Terrain },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
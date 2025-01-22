import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'
import { createWebHistory, createRouter } from 'vue-router'
import landing from './components/landing.vue'
import Recordatorios from './components/Recordatorios.vue'

const routes = [
  { path: '/', component: landing , meta:{requiresAuth: false}},
  { path: '/recordatorios', component: Recordatorios, meta:{requiresAuth: true}},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})




const app = createApp(App)
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.use(router)
app.mount('#app')
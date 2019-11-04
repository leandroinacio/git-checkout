import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SimpleForm from '../views/SimpleForm.vue'
import Eula from '../views/Eula.vue'
import GitData from '../views/GitData.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { level: 0, title: 'Welcome to git-checkout!' }
  },
  {
    path: '/simple-form',
    name: 'simple-form',
    component: SimpleForm,
    meta: { level: 1, title: 'Tell us about you...' }
  },
  {
    path: '/eula',
    name: 'eula',
    component: Eula,
    meta: { level: 2, title: 'It is ok to continue?' }
  },
  {
    path: '/git-data',
    name: 'git-data',
    component: GitData,
    meta: { level: 3, title: 'Thank you for using!' }
  }
]

const router = new VueRouter({
  routes
})

export default router

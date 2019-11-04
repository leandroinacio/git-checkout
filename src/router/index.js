import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SimpleForm from '../views/SimpleForm.vue'
import Eula from '../views/Eula.vue'
import GitData from '../views/GitData.vue'

Vue.use(VueRouter)

const routes = [

  // Home
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { level: 0, title: 'Welcome to git-checkout!' }
  },

  // Simple form with basic info
  {
    path: '/simple-form',
    name: 'simple-form',
    component: SimpleForm,
    meta: { level: 1, title: 'Tell us about you...' }
  },

  // Eula check
  {
    path: '/eula',
    name: 'eula',
    component: Eula,
    meta: { level: 2, title: 'It is ok to continue?' },

    // Avoid users trying to reach page without having entered data
    beforeEnter (to, from, next) {
      const user = JSON.parse(sessionStorage.getItem('user'))

      if (!user || !user.firstName || !user.lastName || !user.userName) {
        next('/')
        return
      }
      next()
    }
  },

  // Git-data display page
  {
    path: '/git-data',
    name: 'git-data',
    component: GitData,
    meta: { level: 3, title: 'Thank you for using!' },

    // Avoid users trying to reach page without having entered data
    beforeEnter (to, from, next) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const email = sessionStorage.getItem('email')

      if (!user || !user.firstName || !user.lastName || !user.userName || !email) {
        next('/')
        return
      }
      next()
    }
  }
]

const router = new VueRouter({
  routes
})

export default router

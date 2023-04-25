import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import TripMainView from '../views/TripMainView.vue'
import TripDetailView from '../views/TripDetailView.vue'
import SignUpView from '../views/SignUpView.vue'
import TripCourseView from '../views/TripCourseView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {

    path: '/tripMain',
    name: 'tripMain',
    component: TripMainView
  },
  {
    path: '/tripDetail',
    name: 'tripDetail',
    component: TripDetailView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/tripcourse',
    name: 'tripcourse',
    component: TripCourseView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

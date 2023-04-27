import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import courseboardView from '../views/courseboardView.vue'
import courseboardListView from '../views/courseboardListView.vue'
import TripMainView from '../views/TripMainView.vue'
import TripDetailView from '../views/TripDetailView.vue'
import RecommendView from '../views/RecommendView.vue'
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
    path:'/courseboard',
    name:'courseboard',
    component: courseboardView
  },
  //코스바구니 리스트(임시)
  {
    path:'/courseboardList',
    name:'courseboardList',
    component: courseboardListView
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
    path: '/recommend',
    name: 'recommend',
    component: RecommendView
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

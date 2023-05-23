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
import MyPageView from '../views/MyPageView.vue'
import store from "../store/index.js"

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
    path:'/courseboar',
    name:'courseboard',
    component: courseboardView,
    props: true,
        beforeEnter: function(to, from, next) {
            if (!store.getters["isLogin"]) {
                alert("로그인 정보 없음, 로그인 페이지로 이동합니다.");
                next('/login');
            } else {
                next();
            }

        }
  },
  //코스바구니 리스트(임시)
  {
    path:'/courseboardList',
    name:'courseboardList',
    component: courseboardListView,
    props: true,
        beforeEnter: function(to, from, next) {
            if (!store.getters["isLogin"]) {
                alert("로그인 정보 없음, 로그인 페이지로 이동합니다.");
                next('/login');
            } else {
                next();
            }

        }
  },
  {

    path: '/tripMain',
    name: 'tripMain',
    component: TripMainView,
    props: true,
        beforeEnter: function(to, from, next) {
            if (!store.getters["isLogin"]) {
                alert("로그인 정보 없음, 로그인 페이지로 이동합니다.");
                next('/login');
            } else {
                next();
            }

        }
  },
  {
    path: '/tripDetail',
    name: 'tripDetail',
    component: TripDetailView,
    props: true,
        beforeEnter: function(to, from, next) {
            if (!store.getters["isLogin"]) {
                alert("로그인 정보 없음, 로그인 페이지로 이동합니다.");
                next('/login');
            } else {
                next();
            }

        }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: RecommendView,
    props: true,
        beforeEnter: function(to, from, next) {
            if (!store.getters["isLogin"]) {
                alert("로그인 정보 없음, 로그인 페이지로 이동합니다.");
                next('/login');
            } else {
                next();
            }

        }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    
  },
  {
    path: '/tripcourse',
    name: 'tripcourse',
    component: TripCourseView,
    props: true,
        beforeEnter: function(to, from, next) {
            if (!store.getters["isLogin"]) {
                alert("로그인 정보 없음, 로그인 페이지로 이동합니다.");
                next('/login');
            } else {
                next();
            }

        }
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView,
    props: true,
        beforeEnter: function(to, from, next) {
            if (!store.getters["isLogin"]) {
                alert("로그인 정보 없음, 로그인 페이지로 이동합니다.");
                next('/login');
            } else {
                next();
            }

        }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

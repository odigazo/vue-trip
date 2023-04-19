import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:[],
  },
  getters: {
    getUserInfo:function(state){
      return state.userinfo;
    }
  },
  mutations: {
    setUserInfo(state,list){
      state.userinfo=list;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState()
  ]
})

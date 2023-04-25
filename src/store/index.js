import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:[],
    names:[],
    latitudes:[],
    longitudes:[]
  },
  getters: {
    getUserInfo:function(state){
      return state.userinfo;
    },
    getNames:function(state){
      return state.names;
    },
    getLatitudes:function(state){
      return state.latitudes;
    },
    getLongitudes:function(state){
      return state.longitudes;
    }
  },
  mutations: {
    setUserInfo(state,list){
      state.userinfo=list;
    },
    setNames(state,list){
      state.names=list;
    },
    setLatitudes(state,list){
      state.latitudes=list;
    },
    setLongitudes(state,list){
      state.longitudes=list;
    },
    
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState()
  ]
})

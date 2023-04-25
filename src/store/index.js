import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:[],
    placeList:[],
    tripDetail: {}
  },
  getters: {
    getUserInfo:function(state){
      return state.userinfo;
    },
    getPlaceList: function(state){
      return state.placeList;
    },
    getTripDetail: function(state){
      return state.tripDetail;
    }
  },
  mutations: {
    setUserInfo(state,list){
      state.userinfo=list;
    },
    setPlaceList(state, list){
      state.placeList = list;
    },
    setTripDetail(state, detail) {
      state.tripDetail = detail;
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

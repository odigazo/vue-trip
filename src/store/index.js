import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:[],
    schedule:[],
    names:[],
    latitudes:[],
    longitudes:[],
    placeList:[],
    tripDetail: {}
  },
  getters: {
    getUserInfo:function(state){
      return state.userinfo;
    },
    getSchedule:function(state){
      return state.schedule;
    },
    getNames:function(state){
      return state.names;
    },
    getLatitudes:function(state){
      return state.latitudes;
    },
    getLongitudes:function(state){
      return state.longitudes;
    },
    getPlaceList: function(state){
      return state.placeList;
    },
    getTripDetail: function(state){
      return state.tripDetail;
    }
  },
  mutations: {
    RESET_STATE(state) {
      state.schedule=null;
      state.names=null;
      state.latitudes=null;
      state.longitudes=null;
    },
    setUserInfo(state,list){
      state.userinfo=list;
    },
    setPlaceList(state, list){
      state.placeList = list;
    },
    setTripDetail(state, detail) {
      state.tripDetail = detail;
    },
    setSchedule(state,list){
      state.schedule=list;
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

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
    tripDetail: {},
    recommendList: [],
    recommendLikeList: [],
    recentCourseList : [],
    comments:[],
    isEditing:[]
    // likeCount: 게시글번호로 좋아요 카운ㄷ트
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
    },
    getRecommendList: function(state){
      return state.recommendList;
    },
    getRecommendLikeList: function(state){
      return state.recommendLikeList;
    },
    getRecentCourseList(state) {
      return state.recentCourseList;
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
    setComments(state,list){
      state.comments=list;
    },
    setIsEditing(state){
      for(var i=0;i<state.comments.length;i++){
        state.isEditing[i]=false;
      }
    },
    setIsEditingTrue(state,index){
      for(var i=0;i<state.comments.length;i++){
        if(i==index){
          state.isEditing[i]=true;
        }
      }
    },
    setIsEditingFalse(state,index){
      for(var i=0;i<state.comments.length;i++){
        if(i==index){
          state.isEditing[i]=false;
        }
      }
    },
    setPlaceList(state, list){
      state.placeList = list;
    },
    setTripDetail(state, detail) {
      state.tripDetail = detail;
    },
    setRecommendList(state, list) {
      state.recommendList = list;
    },
    setRecommendLikeList(state, list) {
      state.recommendLikeList = list;
    },
    setRecentCourseList(state, list) {
      state.recentCourseList = list;
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
    }
    // setLikes(state, ) {
    //   //   state.likes = .likes;
    //  }
  },
    
    
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState()
  ]
})

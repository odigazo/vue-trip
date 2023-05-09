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
    isEditing:[],
    isLoading:false,
    isMapReady:false,
    courseList:[], //코스목록 
    courses: {},
    courseNum:{},
    bestCourseList: [],
    courseIndex:null
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
    },
    getIsLoading: function(state){
      return state.isLoading;
    },
    getIsMapReady: function(state){
      return state.isMapReady;
    },
    getCourseList: function(state){
      return state.courseList;
    },
    getCourses: function(state){
      return state.courses;
    },
    getCourseNum: function(state){
      return state.courseNum;
    },
    getCourseLikeByIndex: (state) => (index) => {
      return state.courseList[index].courseLike;
    },
    getCourseIndex: function(state){
      return state.courseIndex;
    },
    getBestCourseList: (state) => state.bestCourseList,
  },
  mutations: {
    RESET_STATE(state) {
      state.userinfo=null;
      state.schedule=null;
      state.names=null;
      state.latitudes=null;
      state.longitudes=null;
    },
    setUserInfo(state,list){
      state.userinfo=list;
    },
    setComments(state, comments){
      state.comments=comments;
    },
    setIsLoading(state,status){
      state.isLoading=status;
    },
    setIsMapReady(state,status){
      state.isMapReady=status;
    },
    setCourseList(state, courseList) {
      state.courseList = courseList;
    },
    setIsEditing(state){
      for(var i=0;i<state.comments.length;i++){
        state.isEditing[i]=false;
      }
    },
    setIsEditingTrue(state,index){
      for(var i=0;i<state.comments.length;i++){
        console.log("왜 안찍혀",state.isEditing[i]);
        if(i==index){
          state.isEditing[i]=true;
        }
      }
    },
    setIsEditingFalse(state,index){
      for(var i=0;i<state.comments.length;i++){
        console.log("왜 안찍혀",state.isEditing[i]);
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
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
    updateCourseLike(state, { index, newLikeCount }) {
      state.courseList[index].courseLike = newLikeCount;
    },
    setCourseNum(state, courseNum){
      state.courseNum= courseNum;
    },
    setBestCourseList(state, bestCourseList) {
      state.bestCourseList = bestCourseList; 
    },
    setCourseIndex(state, index) {
      state.courseIndex = index; 
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

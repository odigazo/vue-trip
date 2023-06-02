import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: [],
    schedule: [],
    names: [],
    latitudes: [],
    longitudes: [],
    placeList: [],
    currentPage: 1,
    pageGroup: 0,
    createCount: 5,
    addrStr: '',
    courseMap: null,
    tripDetail: {},
    recommendList: [],
    recommendLikeList: [],
    recentCourseList: [],
    comments: [],
    mycomments: [],
    isEditing: [],
    isLoading: false,
    isMapReady: false,
    courseList: [], //전체코스목록
    myList: [], //개인코스목록 
    courses: {},
    courseNum: {},
    bestCourseList: [],
    courseIndex: null,
    count: '',
    answer: '',
    additionalinfo: '',
    purpose: '자연 속 여행',
  },
  getters: {
    getUserInfo: function (state) {
      return state.userinfo;
    },
    isLogin: function (state) {
      return state.userinfo && state.userinfo.userNum >= 1;
    },
    getSchedule: function (state) {
      return state.schedule;
    },
    getNames: function (state) {
      return state.names;
    },
    getLatitudes: function (state) {
      return state.latitudes;
    },
    getLongitudes: function (state) {
      return state.longitudes;
    },
    getPlaceList: function (state) {
      return state.placeList[state.currentPage - 1];
    },
    getCurrentPage: function (state) {
      return state.currentPage;
    },
    getPageGroup: function (state) {
      return state.pageGroup;
    },
    getCreateCount: function (state) {
      return state.createCount;
    },

    getAddrStr: function (state) {
      return state.addrStr;
    },
    getCourseMap: function (state) {
      return state.courseMap;
    },
    getTripDetail: function (state) {
      return state.tripDetail;
    },
    getRecommendList: function (state) {
      return state.recommendList;
    },
    getRecommendLikeList: function (state) {
      return state.recommendLikeList;
    },
    getRecentCourseList(state) {
      return state.recentCourseList;
    },
    getIsLoading: function (state) {
      return state.isLoading;
    },
    getIsMapReady: function (state) {
      return state.isMapReady;
    },
    // getShowMap: function (state) {
    //   return state.showMap;
    // },
    getCourseList: function (state) {
      return state.courseList;
    },
    getMyList: function (state) {
      return state.myList;
    },
    getMyComments: function (state) {
      return state.mycomments;
    },
    getCourses: function (state) {
      return state.courses;
    },
    getCourseNum: function (state) {
      return state.courseNum;
    },
    getCourseLikeByIndex: (state) => (index) => {
      return state.courseList[index].courseLike;
    },
    getCourseIndex: function (state) {
      return state.courseIndex;
    },
    getCount: function (state) {
      return state.count;
    },
    getAnswer: function (state) {
      return state.answer;
    },
    getAdditionalInfo: function (state) {
      return state.additionalinfo;
    },
    getPurpose: function (state) {
      return state.purpose;
    },
    getBestCourseList: (state) => state.bestCourseList,
  },
  mutations: {
    RESET_STATE(state) {
      state.userinfo = null;
      state.schedule = null;
      state.names = null;
      state.latitudes = null;
      state.longitudes = null;
      state.purpose = '자연 속 여행';
      state.placeList = null;
      state.currentPage = 1;
      state.pageGroup = 0;
      state.createCount = 5;
      state.addrStr = '';
      state.courseMap = null;
      state.tripDetail = null;
      state.recommendList = null;
      state.recommendLikeList = null;
      state.recentCourseList = null;
      state.comments = null;
      state.mycomments = null;
      state.isEditing = null;
      state.isLoading = false;
      state.isMapReady = false;
      state.courseList = null;
      state.myList = null;
      state.courses = null;
      state.courseNum = null;
      state.bestCourseList = null;
      state.courseIndex = null;
      state.count = '';
      state.answer = '';
      state.additionalinfo = '';
    },
    setUserInfo(state, list) {
      state.userinfo = list;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    setMyComments(state, mycomments) {
      state.mycomments = mycomments;
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setIsMapReady(state, status) {
      state.isMapReady = status;
    },
    // setShowMap(state, status) {
    //   state.showMap = status;
    // },
    setCourseList(state, courseList) {
      state.courseList = courseList;
    },
    setMyList(state, courseList) {
      state.myList = courseList;
    },
    setIsEditing(state) {
      for (var i = 0; i < state.comments.length; i++) {
        state.isEditing[i] = false;
      }
    },
    setIsEditingTrue(state, index) {
      for (var i = 0; i < state.comments.length; i++) {
        console.log("왜 안찍혀", state.isEditing[i]);
        if (i == index) {
          state.isEditing[i] = true;
        }
      }
    },
    setIsEditingFalse(state, index) {
      for (var i = 0; i < state.comments.length; i++) {
        console.log("왜 안찍혀", state.isEditing[i]);
        if (i == index) {
          state.isEditing[i] = false;
        }
      }
    },
    setPlaceList(state, list) {
      state.placeList = list;
      state.currentPage = 1;
      state.pageGroup = 0;
      state.currentGroup = 1;
      state.createCount = list.length / 5 < 1 ? list.length : 5;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setPageGroup: function (state, number) {
      state.pageGroup += number;
    },
    setCreateCount: function (state, count) {
      state.createCount = count;
    },

    setAddrStr(state, addr) {
      state.addrStr = addr;
    },
    setCourseMap(state, map) {
      state.courseMap = map;
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
    setSchedule(state, list) {
      state.schedule = list;
    },
    setNames(state, list) {
      state.names = list;
    },
    setLatitudes(state, list) {
      state.latitudes = list;
    },
    setLongitudes(state, list) {
      state.longitudes = list;
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
    updateCourseLike(state, { index, newLikeCount }) {
      state.courseList[index].courseLike = newLikeCount;
    },
    setCourseNum(state, courseNum) {
      state.courseNum = courseNum;
    },
    setBestCourseList(state, bestCourseList) {
      state.bestCourseList = bestCourseList;
    },
    setCourseIndex(state, index) {
      state.courseIndex = index;
    },
    setCount(state, count) {
      state.count = count;
    },
    setAnswer(state, answer) {
      state.answer = answer;
    },
    setAdditionalInfo(state, info) {
      state.additionalinfo = info;
    },
    setPurpose(state, purpose) {
      state.purpose = purpose;
    }
  },


  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
})

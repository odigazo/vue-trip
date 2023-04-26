import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:[],
    comments:[],
    isEditing:[],
    // likeCount: 게시글번호로 좋아요 카운ㄷ트
  },
  getters: {
    getUserInfo:function(state){
      return state.userinfo;
    },
  },
  mutations: {
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

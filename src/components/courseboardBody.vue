<template>
<div>
    <hr>
     <div>
            <span></span>
            <div>
                <!-- <input id="co" type="text" @keyup.enter="next('password')" v-model.lazy="email"> -->
            </div>
        </div>
    <div></div>
    <b-textarea
      placeholder="댓글을 입력하세요"
      v-model="contents"
    ></b-textarea>
    <b-button @click="insertComment">댓글쓰기</b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userNum: "",
      contents: "",
    };
  },
  methods: {
    next(input) {
      document.getElementById(input).focus();
    },
    //댓글리스트
    commentList() {
      axios
        .get(this._baseUrl + "comment/commentList", {
          params: {
            userNum: this.userNum,
            contents: this.contents,
          },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.comments == null) {
            alert("댓글을 입력하세요");
          } else {
            this.$store.commit("setComments", JSON.parse(result.data));
            // this.$router.push({name:'main'}); 페이지 이동
            console.log("댓 남기기 성공성공");
          }
        });
    },
    //댓 쓰기
    insertComment() {
      axios
        .post(this._baseUrl + "comment/insertComment", {
          userNum: this.userNum,
          contents: this.contents,
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.comments == null) {
            alert("댓글을 입력하세요");
          } else {
            this.$store.commit("setComments", result.data);
            console.log("댓 남기기 성공성공");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //댓글 수정
    updateComment() {
      axios.put(this._baseUrl + "comment/updateComment", {
          userNum: this.userNum,
          contents: this.contents,
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.comments == null) {
            alert("댓글 수정에 실패하였습니다.");
          } else {
            this.$store.commit("setComments", result.data);
            console.log("댓글 수정 성공");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("댓글 수정에 실패하였습니다.");
        });
    },
    //댓글 삭제
    deleteComment() {
         axios.put(this._baseUrl + "comment/deleteComment",{
            //삭제여부, 삭제날짜
         })
        .then((result) => {
          console.log(result.data);
          if (result.data.comments == null) {
            alert("댓글 수정에 실패하였습니다.");
          } else {
            this.$store.commit("setComments", result.data);
            console.log("댓글 삭제 성공");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
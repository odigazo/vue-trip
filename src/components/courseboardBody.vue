<template>
  <div class="container">
    <h2 class="course-title">{{ this.$store.getters.getCourseList[$store.getters.getCourseIndex].courseTitle }}</h2>
    <p class="course-contents">{{ this.$store.getters.getCourseList[$store.getters.getCourseIndex].courseContents }}</p>
    <button @click="$router.go(-1)" class="back-button">뒤로가기</button>
    <div class="like-section">
      <button @click="addLike" class="like-button">♥</button>
      <span class="like-count">{{ this.$store.getters.getCourseList[$store.getters.getCourseIndex].courseLike }}</span>
    </div>
    <hr class="separator" />

<h2 class="comments-title">댓글 목록</h2>
<ul class="comment-list">
  <li
    v-for="(comment, index) in this.$store.state.comments"
    :key="index"
    class="comment-item"
  >
    <div class="comment-info">
      <span class="comment-num">{{ comment.commentNum }}:</span>
      <span class="user-num">{{ comment.userNum }}:</span>
      <span v-if="!$store.state.isEditing[index]" class="comment-contents">{{ comment.contents }}</span>
      <input v-else type="text" v-model="newContents[index]" class="edit-input" />
    </div>
    <div class="comment-actions">
      <button
        v-if="!$store.state.isEditing[index]"
        @click="startUpdate(index)"
        class="update-button"
      >
        수정
      </button>
      <button v-else @click="updateComment(index,comment.commentNum)" class="update-button">
        저장
      </button>
      <button @click="deleteComment(comment)" class="delete-button">삭제</button>
    </div>
  </li>
</ul>

<h2 class="write-comment-title">댓글 작성</h2>
<div class="comment-form">
  <input
    type="text"
    placeholder="댓글을 입력하세요"
    v-model="contents"
    class="comment-input"
  />
  <button @click="insertComment" class="submit-button">댓글쓰기</button>
</div>
</div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      commentNum: null,
      userNum: 1,
      courseNum: this.$store.getters.getCourseList[this.$store.getters.getCourseIndex].courseNum,
      contents: '',
      isEditing:[],
      newContents:[],
      like: {
        userNum: this.userNum,
      courseNum: this.courseNum,
      },
    };
  },
  created() {
    this.commentList();
  },
  methods: {
    next(input) {
      document.getElementById(input).focus();
    },
    // 코스 조회하는 메서드 추가

    //댓글리스트
    commentList() {
      axios
        .get(this._baseUrl + `comment/commentList/${this.courseNum}`, {
          params: {
            courseNum: this.courseNum,
            userNum: this.userNum
          },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data == null) {
            // alert("댓글을 입력하세요");
            this.$store.commit("setComments", result.data);
          } else {
            this.$store.commit("setComments", result.data);
            // this.$router.push({name:'main'}); 페이지 이동
            console.log("댓글리스트 성공성공");
          }
        });
    },
    //댓 쓰기
    insertComment() {
      this.$axios({
        url: this._baseUrl + "comment/insertComment",
        method: "POST",
        params: {
          userNum: this.userNum,
          courseNum: this.courseNum,
          contents: this.contents,
        },
        responseType: "json",
      }).then(
        function (result) {
          console.log(result.data);
          this.$store.commit("setComments", result.data);
          this.$store.commit("setIsEditing");
          // this.commentList();
          console.log(this.$store.state.comments[0].contents);

        }.bind(this)
        
      );
    },
    startUpdate(index){
      console.log(index);
      this.$store.commit("setIsEditingTrue",index);
      console.log(this.isEditing);
      // this.$router.go(this.$router.currentRoute);
      this.commentList();
    },
    //댓글 수정
    updateComment(index,commentNum) {
      console.log(index,"index임")
      this.$axios({
        url: this._baseUrl + "comment/updateComment",
        method: "PUT",
        params: {
          userNum: this.userNum,
          contents: this.newContents[index],
          commentNum : commentNum,
          courseNum : this.courseNum
        },
        responseType: "json",
      })
        .then(
          function (result) {
            console.log(index,"이게 댓글 인덱스");
            console.log(result.data,"결과임")
            this.$store.commit("setComments", result.data);
             this.$store.commit("setIsEditingFalse", index);
            this.commentList();
           
          }.bind(this)
        )
        .catch(function (error) {
          console.error(error);
        });
        
    },
    //댓글 삭제
    deleteComment(comment) {
      this.$axios({
        url: this._baseUrl + "comment/deleteComment",
        method: "PUT",
      params: {
          commentNum: comment.commentNum,
          contents: comment.contents,
        },
        responseType: "json",
      })
        .then((res) => {
          console.log(res);
          this.$store.commit("setComments", res.data);
          this.commentList();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 좋아요
    addLike() {
      this.$axios({
        url: this._baseUrl + "like/addLike",
        method: "POST",
        params: {
          userNum: this.userNum,
          courseNum: this.courseNum,
        },
        responseType: "json",
      })
          .then((result) => {
      console.log(result.data);
      this.$store.commit("setCourseList", result.data);
    })
    .catch((error) => {
      console.error(error);
    });
    },
  }

};
</script>

<style scoped>
.separator {
  border: 0;
  border-top: 2px solid #ccc;
  margin-bottom: 20px;
}

.comments-title,
.write-comment-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #3c3c3c;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.comment-item {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comment-info {
  display: flex;
  align-items: center;
}

.like-button {
  border: none;
  font-size: 32px;
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: solid 1px black;
  color: red;
}

.comment-num,
.user-num,
.comment-contents {
  font-size: 18px;
  margin-right: 10px;
  color: #2c2c2c;
}

.edit-input {
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

.update-button,
.delete-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
}

.delete-button {
  background-color: #f44336;
}

.comment-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.comment-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.submit-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
}
</style>
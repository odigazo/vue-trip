<template>
  <div>
    <h2>{{ this.$store.getters.getCourseList[$route.params.index].courseTitle }}</h2>
    <!-- <p>번호: {{ this.$store.getters.getCourseList[$route.params.index].courseNum }}</p> -->
    <p>코스: {{ this.$store.getters.getCourseList[$route.params.index].courseContents }}</p>
    
    <button @click="$router.go(-1)">뒤로가기</button>
    
        <div class="like-section">
  <button @click="addLike" class="like-button">좋아요</button>
  <span>{{ this.$store.getters.getCourseList[$route.params.index].courseLike }}</span>
      </div>
     

    <br /><br />
    <h2>댓글 목록</h2>
    <ul class="comment-list">
      <li
        v-for="(comment, index) in this.$store.state.comments"
        :key="index"
        class="comment-item"
      >
        <div class="comment-info">
          <span>{{ comment.commentNum }}:</span>
          <span>{{ comment.userNum }}:</span>
          <span v-if="!$store.state.isEditing[index]">{{ comment.contents }}</span>
          <input v-else type="text" v-model="newContents[index]" />
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

    <h2>댓글 작성</h2>
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
      commentNum: '',
      userNum: 1,
      courseNum: this.$store.getters.getCourseList[this.$route.params.index].courseNum,
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
          console.log(this.$store.state.comments[0].contents);
        }.bind(this)
      );
    },
    startUpdate(index){
      console.log(index);
      this.$store.commit("setIsEditingTrue",index);
      console.log(this.isEditing);
      this.$router.go(this.$router.currentRoute);
    },
    //댓글 수정
    updateComment(index,commentNum) {
      
      this.$axios({
        url: this._baseUrl + "comment/updateComment",
        method: "PUT",
        params: {
          userNum: this.userNum,
          contents: this.newContents[index],
          commentNum : commentNum
        },
        responseType: "json",
      })
        .then(
          function (result) {
            console.log(result.data);
            this.$store.commit("setComments", result.data);
            this.$store.commit("setIsEditingFalse",index);
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
.container {
  width: 80%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.like-section {
  display: flex;
  align-items: center;
}

.like-button {
  background-color: hwb(217 25% 4%);
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 8px;
}

.comment-list {
  list-style: none;
  padding: 0;
}

.comment-item {
  background-color: #f5f5f5;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 자식 요소들을 양쪽으로 분리 */
}

.comment-info {
  margin-bottom: 8px;
}

.comment-actions {
  display: flex;
  gap: 8px;
}

.update-button,
.delete-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}

.delete-button {
  background-color: #f44336;
}

.comment-form {
  display: flex;
  gap: 8px;
}

.comment-input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
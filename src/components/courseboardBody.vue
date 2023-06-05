<template>
  <div>
    <hr />
    <v-container>
      <v-card>
        <v-card-title
          class="headline"
          style="font-weight: bold; font-size: 24px"
        >
          {{
            this.$store.getters.getCourseList[$store.getters.getCourseIndex]
              .courseTitle
          }}
        </v-card-title>
        <v-card-text v-bind:style="{ 'word-wrap': 'break-word' }">
          <v-timeline>
            <v-timeline-item
              v-for="(values, key) in $store.getters.getCourseMap"
              :key="key"
              color="blue"
              small
            >
              <v-card elevation="2">
                <v-card-title class="blue lighten-2">
                  <h2
                    class="text-h6 white--text font-weight-bold"
                    v-text="key"
                  ></h2>
                </v-card-title>
                <v-card-text>
                  <ul class="items">
                    <li v-for="(answer, i) in values" :key="i">
                      {{ answer }}
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="$router.go(-1)" color="primary">목록</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="addLike">
            <v-icon color="red">mdi-heart</v-icon>
          </v-btn>
          <span class="mr-4" style="font-weight: bold">
            {{
              this.$store.getters.getCourseList[$store.getters.getCourseIndex]
                .courseLike
            }}
          </span>
        </v-card-actions>
      </v-card>

      <v-divider class="mt-5 mb-5"></v-divider>

      <h2 class="subtitle-1">댓글 목록</h2>
      <v-list two-line>
        <v-list-item
          v-for="(comment, index) in $store.getters.getComments"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title>{{ comment.userNickname }}</v-list-item-title>
            <v-list-item-subtitle
              v-if="!$store.state.isEditing[index]"
              style="font-weight: bold; color: #000"
            >
              {{ comment.contents }}
            </v-list-item-subtitle>
            <v-text-field
              v-else
              v-model="newContents[index]"
              label="Edit comment"
            ></v-text-field>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              text
              v-if="!$store.state.isEditing[index]"
              @click="startUpdate(index, comment)"
              color="primary"
            >
              수정
            </v-btn>
            <v-btn
              text
              v-else
              @click="updateComment(index, comment)"
              color="primary"
            >
              저장
            </v-btn>
            <v-btn text color="red" @click="deleteComment(comment)">
              삭제
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <h2 class="subtitle-1 mt-5">댓글 작성</h2>
      <v-form @submit.prevent="insertComment">
        <v-text-field
          v-model="contents"
          label="댓글을 입력하세요"
          clearable
        ></v-text-field>
        <v-btn type="submit" color="primary">댓글쓰기</v-btn>
      </v-form>
    </v-container>
  </div>
</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      commentNum: null,
      userNum: this.$store.getters.getUserInfo.userNum,
      courseNum:
        this.$store.getters.getCourseList[this.$store.getters.getCourseIndex]
          .courseNum,
      contents: "",
      isEditing: [],
      newContents: [],
      like: {
        userNum: this.userNum,
        courseNum: this.courseNum,
      },
    };
  },
  created() {
    this.commentList();
    this.$store.commit("setIsEditing");
    console.log(this.$store.getters.getSchedule);
    console.log(this.$store.getters.getIsEditing);
  },
  methods: {
    next(input) {
      document.getElementById(input).focus();
    },
    // 코스 글 순서 줄바꿈 해주는 메서드

    //댓글리스트
    commentList() {
      axios
        .get(this._baseUrl + `comment/commentList/${this.courseNum}`, {
          params: {
            courseNum: this.courseNum,
            userNum: this.userNum,
          },
        })
        .then((result) => {
          console.log(result.data);
          console.log("-----------------------");
          this.$store.commit("setComments", result.data);

          console.log("댓글리스트 성공성공");
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
          this.contents='';
        }.bind(this)
      );
    },
    startUpdate(index, comment) {
      console.log(comment);
      
      if (comment.userNum != this.userNum) {
        alert("수정 불가");
      } else {
        console.log(index, "댓글 인덱스");
        this.$store.commit("setIsEditingTrue", index);
        this.commentList();
      }
    },
    //댓글 수정
    updateComment(index, comment) {
      console.log(index, "index임");

      this.$axios({
        url: this._baseUrl + "comment/updateComment",
        method: "PUT",
        params: {
          userNum: this.userNum,
          contents: this.newContents[index],
          commentNum: comment.commentNum,
          courseNum: this.courseNum,
        },
        responseType: "json",
      })
        .then(
          function (result) {
            console.log(index, "이게 댓글 인덱스");
            console.log(result.data, "결과임");
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
      if (comment.userNum != this.$store.getters.getUserInfo.userNum) {
        alert("삭제 불가");
      }else{
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
      }
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
  },
};
</script>
 
<style scoped>
</style>
<template>
  <div>
    <h2>코스 목록</h2>
    <ul class="board-list">
      <li v-for="(course, index) in $store.getters.getCourseList" :key="index" class="board-info">
        <span>{{ course.courseNum }}</span>
        <button @click="goBoard" class="place-btn">{{ course.placeName }}</button>
        <span>{{ course.courseTitle }}</span>
        <span>{{ course.courseContents }}</span>
        <span>{{ course.courseLike }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  
  data() {
    return {
    courseNum:1,
    placeName:'',
    courseTitle:'',
    courseContents:'',
    courseLike:'', 
    //courses:[], 
    };
  },
  // computed: {
  //   courses() {
  //     return this.$store.state.courseList;
  //   },
  // },
  created() {
    this.courseList();
  },
  methods: {
    next(input) {
      document.getElementById(input).focus();
    },
    goBoard(){
      this.$router.push({name:'courseboard'});
    },
    //글리스트
    courseList() {
      axios
        .get(this._baseUrl + "courseBoard/courseList", {
          params: {
           courseNum: this.courseNum,
           placeName: this.placeName,
           courseTitle: this.courseTitle,
           courseContents: this.courseContents,
           courseLike: this.courseLike,
          },
        }).then(
      function (result) {
        console.log(result.data);
        // this.$router.push({name:'courseboard'}); // 페이지 이동
        this.$store.commit("setCourseList", result.data);
      }.bind(this))
       .catch(function (error) {
          console.error("에러 ", error);
        });
    },
  },

  };
</script>

<style scoped>
.board-list {
  list-style: none;
  padding: 0;
}

.board-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
}

.place-btn {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}

.place-btn:hover {
  background-color: #45a049;
}

/* 필요한 추가 스타일을 적용 */
</style>
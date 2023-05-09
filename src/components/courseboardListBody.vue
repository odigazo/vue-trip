<template>
  <div>
    <h2>코스 목록</h2>
    <ul class="course-list">
      <li
        v-for="(course, index) in $store.getters.getCourseList"
        :key="index"
        class="course-item"
      >
        <button @click="goBoard(index, course.courseNum)" class="course-btn">
          {{ course.courseTitle }}
        </button>
        <span>{{ course.courseLike }}</span>
      </li>
    </ul>
 

    <h2>베스트 코스 목록</h2>
    <ul class="best-course-list">
      <li
        v-for="(bestCourse, index) in sortedCourseList"
        :key="index"
        class="best-course-item"
      >
        <button @click="goLikeBoard(index, bestCourse.courseNum)" class="best-course-btn">
          {{ bestCourse.courseTitle }}
        </button>
        <span>{{ bestCourse.courseLike }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      courseNum: 1,
      courseTitle: "",
      courseContents: "",
      courseLike: "",
      sortedCourseList:[],
      indexy:[],
      // index:
    }
  },
  // computed: {
  //   courses() {
  //     return this.$store.state.courseList;
  //   },
  // },
  mounted() {
    const courses = this.$store.getters.getCourseList;
   const sortedCourses = courses.slice().sort((a, b) => b.courseLike - a.courseLike);
    console.log(this.sortedCourseList, "이거 원해요");
    // this.$store.getters.getCourseList
    // 원래 인덱스와 sorted한 인덱스가
    // {1: 2}
    const indexMap = Object.fromEntries(
      courses.map((course, index) => [index, sortedCourses.indexOf(course)])
    );

    // 결과를 할당합니다.
    this.sortedCourseList = sortedCourses;
    this.indexMap = indexMap;
    console.log(indexMap, "인덱스 맵 테스트");

  },
  created() {
    this.likeList();
  },
  methods: {
    next(input) {
      document.getElementById(input).focus();
    },
    goBoard(index, courseNum) {
      console.log(this.$store.getters.getCourseList[index]);
      this.$store.commit("setCourseNum", courseNum);
      this.$store.commit("setCourseIndex", index);
      // this.$router.push({ name: "courseboard", params: { index: index } });
      this.$router.push({ name: "courseboard" });
    },
    goLikeBoard(index, courseNum) {
      //  const sortedIndex = this.sortedBestCourseList.findIndex((course) => course.courseNum === courseNum);
    console.log(this.indexMap[index],"map형태");
    console.log(courseNum,"상세");
    console.log(index, "인덱스");
    this.$store.commit("setCourseNum", courseNum);
    this.$store.commit("setCourseIndex", this.indexMap[index]);
    // this.$router.push({ name: "courseboard", params: { index: this.indexMap[index] } });
    this.$router.push({ name: "courseboard" });
    },
    //글리스트
    courseList() {
      axios
        .get(this._baseUrl + "courseBoard/courseList", {
          params: {
            //  courseNum: this.courseNum,
            //  placeName: this.placeName,
            //  courseTitle: this.courseTitle,
            //  courseContents: this.courseContents,
            //  courseLike: this.courseLike,
          },
        })
        .then(function (result) {
          console.log(result.data);
          // this.$router.push({name:'courseboard'}); // 페이지 이동
          this.$store.commit("setCourseList", result.data);
        })
        .catch(function (error) {
          console.error("에러 ", error);
        });
    },
    //베스트 목록
    likeList() {
      axios
        .get(this._baseUrl + 'courseBoard/likeList', {
          params: {},
        })
        .then((result) => {
          this.$store.commit('setBestCourseList', result.data);
        })
        .catch((error) => {
          console.error('에러 ', error);
        });
    },
  },
};
</script>

<style scoped>
.course-list,
.best-course-list {
  list-style: none;
  padding: 0;
}

.course-item,
.best-course-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.course-btn,
.best-course-btn {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  text-transform: uppercase;
}

.course-btn:hover,
.best-course-btn:hover {
  background-color: #45a049;
}
</style>
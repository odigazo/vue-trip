<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card class="elevation-2 mb-5 best-course-card" outlined tile>
          <v-card-title class="text-center title font-weight-bold" style="background-color: #f8f9fa;">베스트 코스 목록</v-card-title>
          <v-list>
            <v-list-item
  v-for="(bestCourse, index) in topTenCourses"
  :key="index"
  @click="goLikeBoard(index, bestCourse.courseNum)"
  class="py-2"
  two-line
  link
>
              <v-list-item-content>
                <v-list-item-title class="subtitle-1 font-weight-bold">{{ bestCourse.courseTitle }}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{ bestCourse.courseLike }} Likes</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="9">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="elevation-2 mb-5" outlined>
              <v-card-title class="text-center title font-weight-bold" style="background-color: #f8f9fa;">코스 목록</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="(course, index) in $store.getters.getCourseList"
                    :key="index"
                    @click="goBoard(index, course.courseNum)"
                    class="py-2"
                    two-line
                  >
                    <v-list-item-content>
                      <v-list-item-title class="subtitle-1" style="color: #00000099; font-weight:800">{{ course.courseTitle }}</v-list-item-title>
                      <v-list-item-subtitle class="caption" style="font-weight:800">{{ course.courseLike }} Likes</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
  computed: {
  topTenCourses() {
    return this.sortedCourseList.slice(0, 10);
  }
},
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
    schedule(){
    axios
          .get(this._baseUrl + "course/schedule", {
            params: {
              answer: this.$store.getters.getCourseList[this.$store.getters.getCourseIndex].courseContents
            },
          })
          .then((result) => {
            console.log(result);
            this.$store.commit("setSchedule", result.data);
            // this.$store.commit("setIsLoading", false);
          })
          .catch(function () {
            console.log("fail");
          });
        },
    goBoard(index, courseNum) {
      console.log(this.$store.getters.getCourseList[index]);
      this.schedule();
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
</style>

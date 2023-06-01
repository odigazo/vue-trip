<template>
  <div class="main text-center">
    
    <img class="logo" src="../assets/image/triplogo.png"/>
    
    <v-row justify="center" align="center" class="h-100">
     
      <v-card class="md-4 mx-lg-auto" max-width="600">
        <v-img
          class="white--text align-end"
          height="400px"
          src="https://image.news1.kr/system/photos/2020/5/18/4198953/article.jpg/dims/optimize"
        >
        </v-img>

        <!-- <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle> -->

        <v-card-text class="text--primary">
          <h3>국내 여행을 가고 싶으신가요?</h3>
          <h3>저희가 당신에게 맞는 여행지와 여행코스를 추천해드릴게요</h3>
          <h3>지금 로그인 해서 여행 계획을 세워보세요</h3>
        </v-card-text>
        <v-divider class="ma-3"></v-divider>
        <v-card-actions>
          <v-row justify="center">
            <v-btn class="ma-2" x-large color="primary" dark @click="login()"
              >로그인</v-btn
            >
            <!-- <v-btn class="mx-10" x-large color="primary" dark @click="signup()">회원가입</v-btn> -->
          </v-row>
        </v-card-actions>
      </v-card>
      
    </v-row>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "MainView",

  methods: {
    login() {
      this.$router.push({ name: "login" });
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    // tripMain() {
    //   this.$router.push({ name: "tripMain" });
    // },
    // gotoBoard() {
    //   this.$store.commit("setIsEditing");
    //   this.$router.push({ name: "courseboard" });
    // },
    // gotocsBoard() {
    //   console.log("....");
    //   axios
    //     .get(this._baseUrl + "courseBoard/courseList", {
    //       params: {},
    //     })
    //     .then((result) => {
    //       console.log(result.data);
    //       this.$store.commit("setCourseList", result.data);
    //       // this.$store.commit("setCourseList", result.data);
    //       this.$router.push({ name: "courseboardList" });
    //     })
    //     .catch(function (error) {
    //       console.error("에러 ", error);
    //     });
    // },
  },
};
</script>
<style>
.main {
  background-color: rgb(255, 255, 255);
}
.h-100 {
  height: 100%;
}
.logo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

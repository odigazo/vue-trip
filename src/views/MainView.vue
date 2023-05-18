<template>
  <div class="main text-center">
    <img src="../assets/image/triplogo.png" />
    <div><v-btn small color="primary" dark @click="login()">Login</v-btn></div>
    <div>
      <v-btn small color="primary" dark @click="signup()">Sign Up</v-btn>
    </div>
    <v-btn small color="primary" dark @click="tripMain"
      >TripMain으로 이동</v-btn
    >
    <v-btn small color="primary" dark @click="gotoBoard">댓글로 이동</v-btn>
    <v-btn small color="primary" dark @click="gotocsBoard"
      >courseboardList</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";



export default {
  name: "MainView",
  
  methods: {
    
    login() {
      this.$router.push({ name: "login" });
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    tripMain() {
      this.$router.push({ name: "tripMain" });
    },
    gotoBoard() {
      this.$store.commit("setIsEditing");
      this.$router.push({ name: "courseboard" });
    },
    gotocsBoard() {
      console.log("....");
      axios
        .get(this._baseUrl + "courseBoard/courseList", {
          params: {},
        })
        .then((result) => {
          console.log(result.data);
          this.$store.commit("setCourseList", result.data);
          // this.$store.commit("setCourseList", result.data);
          this.$router.push({ name: "courseboardList" });
        })
        .catch(function (error) {
          console.error("에러 ", error);
        });
    },
  },
};
</script>
<style>
</style>

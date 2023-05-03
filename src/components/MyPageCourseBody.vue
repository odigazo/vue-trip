<template>
  <div class="myPageCourse">
    <!-- <h3>마이페이지</h3>
    <hr /> -->
    <div class="container">
      <!-- <div class="left">
        <p>회원정보수정</p>
        <h4>내가 담은 코스</h4>
        <p>내가 쓴 댓글</p>
      </div>
      <div class="line"></div> -->
      <div class="myCourse">

      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.container {
  width: 100%;
}
.left {
  float: left;
  width: 20%;
}
.myCourse {
  float: right;
  width: 80%;
}
.line {
  border-left: 1px solid rgb(0, 0, 0);
  height: 100%;
  position: absolute;
  left: 20%;
  margin-left: 3px;
  top: 23%;
}
</style>
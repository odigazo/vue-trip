<template>
  <div class="mainHeader">
    <a @click="searchPlaces()"><img class="logo" src="../assets/image/triplogo.png" /></a>
    <div class="center">
      <div class="signup"><a @click="searchPlaces()">여행지 찾기</a></div>
      <div class="signup"><a @click="recommendPlaces()">여행지 추천</a></div>
      <div class="signup"><a @click="courseBoard()">코스바구니</a></div>
    </div>
    <div class="right">
      <div>{{ $store.getters.getUserInfo.userNickname }}</div>
      <div class="signup2"><a @click="myPage()">마이페이지</a></div>
      <div>
        미방문한 코스가<a class="signup" @click="courseBoard()">0</a>개
        있습니다.
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  methods: {
    searchPlaces() {
      if (this.$router.currentRoute.name == "tripMain") {
        return;
      } else {
        this.$router.push({ name: "tripMain" });
      }
    },
    recommendPlaces() {
      // this.$router.push({name:})
    },
    courseBoard() {
      axios
        .get(this._baseUrl + "courseBoard/courseList", {
          params: {
          },
        })
        .then(result=> {
          console.log(result.data);
          this.$store.commit("setCourseList",result.data);
          // this.$store.commit("setCourseList", result.data);
          this.$router.push({name:'courseboardList'});
        })
        .catch(function (error) {
          console.error("에러 ", error);
        });
    },
    myPage(component) {
      if (window.location.pathname !== "/mypage") {
        this.$router.push({ name: "mypage", params: { component: component } });
      }else{
        console.log('페이지 동일');
      }
    },
  },
};
</script>
<style scoped>
div.mainHeader {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: rgb(0, 166, 255);
}
.center {
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
div.right {
  flex: 1;
  text-align: right;
  font-size: 10px; /* 글자 크기 */
}
div.middle {
  flex: 1;
  text-align: center;
  font-size: 24px; /* 글자 크기 */
  font-weight: bold; /* 글자 굵기 */
}

div.signup {
  text-align: right;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin-right: 20px;
}
div.signup2 {
  text-align: right;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
a.signup {
  text-align: right;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
<template>
  <div class="mainHeader">
    <img class="logo" src="../assets/image/triplogo.png" />
    <div class="center">
      <div class="signup"><a @click="searchPlaces()">여행지 찾기</a></div>
      <div class="signup"><a @click="recommendPlaces()">여행지 추천</a></div>
      <div class="signup"><a @click="courseBoard()">코스바구니</a></div>
    </div>
    <div class="right">
      <div>{{ $store.getters.getUserInfo.userNickname }}</div>
      <div class="signup2"><a @click="logout()">로그아웃</a></div>
      <div class="signup2"><a @click="myPage()">마이페이지</a></div>
      <div>
        미방문한 코스가<a class="signup" @click="myPage('MyPageCourseBody')"
          >0</a
        >개 있습니다.
      </div>
    </div>
  </div>
</template>
<script>
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
      if (this.$router.currentRoute.name == "recommend") {
        return;
      } else {
        this.$axios({
          url: "http://dapi.kakao.com/v2/local/search/address.json",
          method: "GET",
          headers: {
            Authorization: "KakaoAK 28129ad995eebba2852f3ad70480cfaa",
            "content-type": "application/json",
          },
          params: {
            query: this.$store.getters.getUserInfo.userAddr, //사용자의 주소
          },
          withCredentials: false,
          responseType: "json",
        }).then(
          function (result) {
            let longitude = result.data.documents[0].road_address.x;
            let latitude = result.data.documents[0].road_address.y;

            this.$axios({
              url: "http://localhost:8080/trip/mainPage/recommend",
              method: "POST",
              data: {
                latitude: latitude,
                longitude: longitude,
              },
              responseType: "json",
            }).then(
              function (result) {
                this.$store.commit("setRecommendList", result.data);
                this.$router.push("recommend");
              }.bind(this)
            );
          }.bind(this)
        );
      }
    },
    courseBoard() {},
    myPage(component) {
      console.log(window.location.pathname);
      if (window.location.pathname !== "/mypage") {
        this.$router.push({ name: "mypage", params: { component: component } });
      }else{
        console.log('페이지 동일');
      }
      
    },
    logout() {
      this.$store.commit("RESET_STATE");
      this.$router.push({ name: "main" });
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
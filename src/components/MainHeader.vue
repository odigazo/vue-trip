<template>
  <div class="mainHeader">
    <img class="logo" src="../assets/image/triplogo.png" />
    <div class="center">
      <div class="signup"><a @click="searchPlaces()">여행지 찾기</a></div>
      <div class="signup"><a @click="recommendPlaces()">여행지 추천</a></div>
      <div class="signup"><a @click="courseBoard()">코스바구니</a></div>
      <div class="search-container">
      <input
        id="search"
        type="text"
        placeholder="주소를 입력해주세요"
        v-model="keyword"
      />
      </div>
    </div>
    <div class="right">
      <div>{{ $store.getters.getUserInfo.userNickname }}</div>
      <div class="signup2"><a @click="logout()">로그아웃</a></div>
      <div class="signup2"><a @click="myPage()">마이페이지</a></div>
      <div>
        미방문한 코스가<a class="signup" @click="myPage(MyPageCourseBody)">0</a>개
        있습니다.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    myPage(component) {
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
    searchPlaces() {
      if (this.$router.currentRoute.name == "tripMain") {
        return;
      } else {
        this.$router.push({ name: "tripMain" });
      }
    },

    autoComplete() {
      if (this.keyword.charCodeAt(0) >= 44032) {
        //아스키 코드가 '가'보다 큰 경우
        this.$axios({
          url: "http://localhost:8080/trip/mainPage/keyword",
          method: "GET",
          params: {
            keyword: this.keyword,
          },
          responseType: "json",
        }).then(
          function (result) {
            if (result.data.length != 0) {
              let placeList = [];
              for (let i = 0; i < result.data.length - 4; i += 5) {
                let fivePlace = {};
                fivePlace.place1 = result.data[i];
                fivePlace.place2 = result.data[i + 1];
                fivePlace.place3 = result.data[i + 2];
                fivePlace.place4 = result.data[i + 3];
                fivePlace.place5 = result.data[i + 4];
                placeList.push(fivePlace);
              }
              this.$store.commit("setPlaceList", placeList);
            }
          }.bind(this)
        );
      } else {
        return;
      }
    },
    recommendPlace() {
      let userInfo = this.$store.getters.getUserInfo;
      if (this.$router.currentRoute.name == "recommend") {
        return;
      } else {
        this.$axios({
          url : 'http://dapi.kakao.com/v2/local/search/address.json',
          method : 'GET',
          headers : {
            'Authorization' : 'KakaoAK 28129ad995eebba2852f3ad70480cfaa',
            'content-type' : 'application/json'
          },
          params : {
            query : '인천광역시 미추홀구 경원대로 887번길 24-25' //사용자의 주소
          },
          withCredentials: false,
          responseType : 'json'
        }).then(function(result) {
          let longitude = result.data.documents[0].road_address.x;
          let latitude = result.data.documents[0].road_address.y;

          this.$axios({
            url: 'http://localhost:8080/trip/mainPage/recommendDistance',
            method: 'POST',
            data: {
              'latitude' : latitude,
              'longitude' : longitude
            },
            responseType: 'json'
          }).then(function(result) {
            this.$store.commit('setRecommendList', result.data);
            this.$router.push('recommend');
          }.bind(this));
        }.bind(this));

        this.$axios({
          url: 'http://localhost:8080/trip/mainPage/recommendLike',
          method: 'GET',
          params: {
            userInfo : userInfo.userNum
          },
          responseType: 'json'
        }).then(function(result) {
          this.$store.commit('setRecommendLikeList', result.data);
        }.bind(this));

        this.$axios({
          url: 'http://localhost:8080/trip/mainPage/recentCourse',
          method: 'GET',
          responseType: 'json'
        }).then(function(result) {
          console.log(result.data);
          this.$store.commit('setRecentCourseList', result.data);
        }.bind(this));
      }

    }
  },
  watch: {
    keyword: function () {
      if (this.keyword != "") {
        this.autoComplete();
      } else {
        this.$axios({
          url: "http://localhost:8080/trip/mainPage",
          method: "GET",
          responseType: "json",
        }).then(
          function (places) {
            let list = places.data;
            let placeList = [];
            for (let i = 0; i < list.length - 4; i += 5) {
              let fivePlace = {};
              fivePlace.place1 = list[i];
              fivePlace.place2 = list[i + 1];
              fivePlace.place3 = list[i + 2];
              fivePlace.place4 = list[i + 3];
              fivePlace.place5 = list[i + 4];
              placeList.push(fivePlace);
            }
            this.$store.commit("setPlaceList", placeList);
          }.bind(this)
        );
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
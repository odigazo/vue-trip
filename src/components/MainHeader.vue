<template>
  <div class="mainHeader">
    <img class="logo" src="../assets/image/triplogo.png" />
    <div class="center">
      <div class="signup"><a @click="searchPlaces()">사계절여행</a></div>
      <div class="signup"><a @click="recommendPlaces()">맞춤 여행추천</a></div>
      <div class="signup"><a @click="courseBoard()">모행객 추천코스</a></div>
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
import axios from 'axios';
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    courseBoard(){
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
    recommendPlaces() {
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
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
  font-size: 14px;
}
div.middle {
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

div.signup, div.signup2, a.signup {
  text-align: right;
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: pointer;
  margin-right: 20px;
  transition: color 0.3s;
}
div.signup:hover, div.signup2:hover, a.signup:hover {
  color: rgb(200, 200, 200);
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 20px;
}

.search-container {
  position: relative;
  margin-left: 20px;
}

input#search {
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input#search:focus {
  border-color: rgb(0, 166, 255);
}
</style>

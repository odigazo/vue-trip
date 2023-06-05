<template>
  <div class="mainHeader">
    <a @click="searchPlaces()"><img class="logo" src="../assets/image/triplogo.png" /></a>
    <div class="center">
      <div class="my-2"><v-btn text color="primary" style="font: inherit;" x-large @click="searchPlaces()">사계절여행</v-btn></div>
      <div class="my-2"><v-btn text color="primary" style="font: inherit;" x-large @click="recommendPlaces()">AI 여행추천</v-btn></div>
      <div class="my-2"><v-btn text color="primary" style="font: inherit;" x-large @click="courseBoard()">모행객 추천코스</v-btn></div>
    </div>
    <div class="right">
      <div>
        <v-btn @click="myPage()" text color="primary" class="font-weight-bold" >마이페이지</v-btn>
        <v-btn @click="logout()" text color="primary" class="font-weight-bold" >로그아웃</v-btn>
      </div>
      <div class="font-weight-bold" style="font-size: 13px;">
        <font class="font-weight-bold" text>{{ $store.getters.getUserInfo.userNickname + "님, "}}</font>
        미방문한 코스가 <a class="signup" @click="myPage()">{{$store.getters.getCount}}</a>개
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
            'query' : userInfo.userAddr //사용자의 주소
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
              'longitude' : longitude,
            },
            responseType: 'json'
          }).then(function(result) {
            console.log(result.data, '리스트요~');
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
          url: 'http://localhost:8080/trip/mainPage/mostPlace',
          method: 'GET',
          responseType: 'json'
        }).then(function(result) {
          this.$store.commit('setRecentCourseList', result.data);
        }.bind(this));
      }

    },
    logout() {
      this.$store.commit("RESET_STATE");
      this.$router.push({ name: "main" });
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
    myPage() {
      if (window.location.pathname !== "/mypage") {
        axios
        .get(this._baseUrl + "courseBoard/myList", {
          params: {
            userNum : this.$store.getters.getUserInfo.userNum
          },
        })
        .then(result=> {
          console.log(result.data);
          this.$store.commit("setMyList",JSON.parse(result.data.boardlist));
          this.$store.commit("setMyComments",JSON.parse(result.data.commentlist));
          // this.$store.commit("setCourseList", result.data);
          this.$router.push({ name: "mypage" });
        })
        .catch(function (error) {
          console.error("에러 ", error);
        });
        
      }else{
        console.log('페이지 동일');
      }
    },
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
  }
};
</script>
<style scoped>
div.mainHeader {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: rgb(255, 255, 255);
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
  width: 150px;
  height: 120px;
  border-radius: 50%;
  margin-left: 20px;
}
</style>
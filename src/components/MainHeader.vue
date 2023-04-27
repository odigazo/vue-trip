<template>
  <div class="mainHeader">
    <img class="logo" src="../assets/image/triplogo.png" />
    <div class="middle">메인 페이지</div>
    <div class="signup"><a @click="recommendPlace()">추천 여행지</a></div>
    <div class="signup"><a @click="searchPlaces()">여행지 찾기</a></div>

    <div class="search-container">
      <input
        id="search"
        type="text"
        placeholder="주소를 입력해주세요"
        v-model="keyword"
      />
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
      // let userInfo = this.$store.getters.getUserInfo;
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
            query : '서울특별시 관악구 복은2길 45' //사용자의 주소
          },
          withCredentials: false,
          responseType : 'json'
        }).then(function(result) {
          let latitude = result.data.documents[0].road_address.x;
          let longitude = result.data.documents[0].road_address.y;
          this.$axios({
            url: 'http://localhost:8080/trip/mainPage/recommend',
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
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.autocomplete-item {
  padding: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.childDiv:hover {
  background-color: #f5f5f5;
}

.autocomplete-item {
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  z-index: 999;
}

.autocomplete-item > div {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
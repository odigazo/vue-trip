<template >
  <div class="tripMainBody">
    <div
      class="background-image"
      :style="`background-image: url('${imagePath}');`"
    ></div>
    <div class="search-container">
    <v-toolbar dense floating style="border-radius: 6px;">
      <v-text-field
        hide-details
        single-line
        label="주소명"
        v-model="keyword"
      ></v-text-field>
    </v-toolbar>
    
    </div>
    <div class="category-container">
      <h1 class="category" @click="searchCategory('전체')">#전체</h1>
      <h1 class="category" @click="searchCategory('spring')">#봄</h1>
      <h1 class="category" @click="searchCategory('summer')">#여름</h1>
      <h1 class="category" @click="searchCategory('autumn')">#가을</h1>
      <h1 class="category" @click="searchCategory('winter')">#겨울</h1>
    </div>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(place, i) in $store.getters.getPlaceList">
        <v-col :key="i" cols="12" md="3" class="grid-image">
          <div class="grid-container">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                @click="tripDetail(place.placeName)"
              >
                <v-img :src="place.thumnailUrl">
                  <v-card-title class="text-h6 white--text">
                    <v-row
                      class="fill-height flex-column"
                      justify="space-between"
                    >
                      <p
                        class="mt-4 subheading text-left place-name"
                        :style="{ visibility: hover ? 'hidden' : 'visible' }"
                      >
                        {{ place.placeName }}
                      </p>
                    </v-row>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-hover>
          </div>
        </v-col>
      </template>
    </v-row>
    <v-container class="pageBtnContainer">
      <v-btn
        v-if="prev"
        @click="prevPage($store.getters.getCurrentPage)"
        class="pageBtn"
      >
        이전
      </v-btn>
      <v-btn
        v-for="i in $store.getters.getCreateCount"
        :key="i"
        @click="changeCurrentPage(i + $store.getters.getPageGroup)"
        :class="{'pageBtn': true, 'active': i + $store.getters.getPageGroup === $store.getters.getCurrentPage}"
        min-width="34px"
      >
        {{i + $store.getters.getPageGroup}}
      </v-btn>
      <v-btn
        v-if="next"
        @click="nextPage($store.getters.getCurrentPage)"
        class="pageBtn"
      >
        다음
      </v-btn>
    </v-container>
      
    </v-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
      category: "",
      imagePath: "",
      keyword: "",
      prev : false,
      next : true
      
    };
  },

  methods: {
    changeCurrentPage(currentPage) {
        this.$store.commit("setCurrentPage", currentPage);
    },
    prevPage(currentPage) {
      if (currentPage == 2) {
        this.$store.commit("setCurrentPage", currentPage-1);
        // this.prev = false;
        return;
      }

      if (currentPage%5 == 1) {
        this.next = true;
        if (currentPage-1 == 5) { //버튼 갯수 설정
          this.prev = false;
          this.$store.commit("setCurrentPage", currentPage-1);
          this.$store.commit("setCreateCount", 5);
        }
        this.$store.commit("setCurrentPage", currentPage-1);
        this.$store.commit("setPageGroup", -5);
      }else {
        this.$store.commit("setCurrentPage", currentPage-1);
      }

      },
      nextPage(currentPage) {
        if (currentPage == this.$store.getters.getPlaceList.length-1) {
          this.$store.commit("setCurrentPage", currentPage+1);
          return;
      }

      if (currentPage%5 == 0) {
        this.prev = true;
        if ((this.$store.getters.getPlaceList.length - currentPage) <= 5) { //버튼 갯수 설정
          this.next = false;
          let length = this.$store.getters.getPlaceList.length;
          let count = this.$store.getters.getCreateCount;
          let result = length%count == 0 ? 5 : length%count;

          this.$store.commit("setCreateCount", result);
          this.$store.commit("setCurrentPage", currentPage+1);
        }
        this.$store.commit("setCurrentPage", currentPage+1);
        this.$store.commit("setPageGroup", 5);
      } else {
        this.$store.commit("setCurrentPage", currentPage+1);
      }
    },
    tripDetail(placeName) {
      this.$axios({
        url: this._baseUrl + "mainPage/detail",
        method: "GET",
        params: {
          placeName: placeName,
        },
        responseType: "json",
      }).then(
        function (detail) {
          let placeDetail = detail.data;
          this.$axios({
            url: "https://dapi.kakao.com/v2/local/search/keyword.json",
            method: "GET",
            params: {
              query: placeName,
            },
            headers: {
              Authorization: "KakaoAK 28129ad995eebba2852f3ad70480cfaa",
            },
            withCredentials: false,
            responseType: "json",
          }).then(
            function (result) {
              if (result.data.documents.length != 0) {
                placeDetail.placeUrl = result.data.documents[0].place_url;
              }
              this.$store.commit("setTripDetail", placeDetail);
              this.$router.push({ name: "tripDetail" });
            }.bind(this)
          );
        }.bind(this)
      );
    },
    searchCategory(season) {
      this.category = season;
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
              let placeList = result.data;
              //---------------------------------------------------
              let end = parseInt(placeList.length / 20) + 1;
              let last = placeList.length % 20;
              let start = 0;
              let per = 20;

              let pageList = [];
              for (let i = 0; i < end; i++) {
                let perPage = [];
                let cnt = 0;
                if (i == end - 1) {
                  for (let k = start; k < start + last; k++) {
                    perPage[cnt] = placeList[k];
                    cnt++;
                  }
                  pageList[i] = perPage;
                  break;
                }
                for (let j = start; j < per; j++) {
                  perPage[cnt] = placeList[j];
                  cnt++;
                }
                pageList[i] = perPage;
                start += 20;
                per = start + 20;
              }
              this.prev = false;
              this.next = true;
              this.$store.commit("setPlaceList", pageList);
              //---------------------------------------------------
            }
          }.bind(this)
        );
      } else {
        return;
      }
    },
  },
  created() {
    this.$axios({
      url: this._baseUrl + "mainPage",
      method: "GET",
      responseType: "json",
    }).then(
      function (places) {
        let placeList = places.data;
        //---------------------------------------------------
        let end = parseInt(placeList.length / 20) + 1;
        let last = placeList.length % 20;
        let start = 0;
        let per = 20;

        let pageList = [];
        for (let i = 0; i < end; i++) {
          let perPage = [];
          let cnt = 0;
          if (i == end - 1) {
            for (let k = start; k < start + last; k++) {
              perPage[cnt] = placeList[k];
              cnt++;
            }
            pageList[i] = perPage;
            break;
          }
          for (let j = start; j < per; j++) {
            perPage[cnt] = placeList[j];
            cnt++;
          }
          pageList[i] = perPage;
          start += 20;
          per = start + 20;
        }

        this.prev = false;
        this.next = true;
        this.$store.commit("setPlaceList", pageList);
        //---------------------------------------------------
        this.category = "전체";
        this.imagePath = "../전체.jpg";
      }.bind(this)
    );
  },
  watch: {
    category: function () {
      if (this.category == "전체") {
        this.$axios({
          url: "http://localhost:8080/trip/mainPage",
          method: "GET",
          responseType: "json",
        }).then(
          function (places) {
            let placeList = places.data;
            //---------------------------------------------------
            let end = parseInt(placeList.length / 20) + 1;
            let last = placeList.length % 20;
            let start = 0;
            let per = 20;

            let pageList = [];
            for (let i = 0; i < end; i++) {
              let perPage = [];
              let cnt = 0;
              if (i == end - 1) {
                for (let k = start; k < start + last; k++) {
                  perPage[cnt] = placeList[k];
                  cnt++;
                }
                pageList[i] = perPage;
                break;
              }
              for (let j = start; j < per; j++) {
                perPage[cnt] = placeList[j];
                cnt++;
              }
              pageList[i] = perPage;
              start += 20;
              per = start + 20;
            }
            this.prev = false;
            this.next = true;
            this.$store.commit("setPlaceList", pageList);
            //---------------------------------------------------
            this.imagePath = "../전체.jpg";
          }.bind(this)
        );
      } else {
        switch (this.category) {
          case "spring":
            this.imagePath = "../봄.jpg";
            break;
          case "summer":
            this.imagePath = "../여름.jpg";
            break;
          case "autumn":
            this.imagePath = "../가을.jpg";
            break;
          case "winter":
            this.imagePath = "../겨울.jpg";
            break;
        }
        this.$axios({
          url: "http://localhost:8080/trip/mainPage/category",
          method: "GET",
          params: {
            season: this.category,
          },
          responseType: "json",
        }).then(
          function (places) {
            let placeList = places.data;
            //---------------------------------------------------
            let end = parseInt(placeList.length / 20) + 1;
            let last = placeList.length % 20;
            let start = 0;
            let per = 20;

            let pageList = [];
            for (let i = 0; i < end; i++) {
              let perPage = [];
              let cnt = 0;
              if (i == end - 1) {
                for (let k = start; k < start + last; k++) {
                  perPage[cnt] = placeList[k];
                  cnt++;
                }
                pageList[i] = perPage;
                break;
              }
              for (let j = start; j < per; j++) {
                perPage[cnt] = placeList[j];
                cnt++;
              }
              pageList[i] = perPage;
              start += 20;
              per = start + 20;
            }
            this.prev = false
            this.next = true
            this.$store.commit("setPlaceList", pageList);
            //---------------------------------------------------
          }.bind(this)
        );
      }
    },
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
            let placeList = places.data;
            //---------------------------------------------------
            let end = parseInt(placeList.length / 20) + 1;
            let last = placeList.length % 20;
            let start = 0;
            let per = 20;

            let pageList = [];
            for (let i = 0; i < end; i++) {
              let perPage = [];
              let cnt = 0;
              if (i == end - 1) {
                for (let k = start; k < start + last; k++) {
                  perPage[cnt] = placeList[k];
                  cnt++;
                }
                pageList[i] = perPage;
                break;
              }
              for (let j = start; j < per; j++) {
                perPage[cnt] = placeList[j];
                cnt++;
              }
              pageList[i] = perPage;
              start += 20;
              per = start + 20;
            }
            this.prev = false;
            this.next = true;
            this.$store.commit("setPlaceList", pageList);
            //---------------------------------------------------
          }.bind(this)
        );
      }
    }


  },
};
</script>
<style scoped>
.grid-image {
  position: relative;
  padding: 10% 10%; /* Added padding to create the invisible grid */
}

.grid-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.pageBtnContainer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-right: 150px;
}

.pageBtn {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  margin-left: 4.8px;
  margin-right: 4.8px;
  margin-right: 5px;
  min-width: 34px;
}

.pageBtn.active {
  background-color: skyblue;
  color: white;
}
.tripMainBody {
  position: relative;
}
.search-container {
  padding: 10px;
}
.v-toolbar {
  width: 400px;
}
.v-text-field {
  width: 370px;
}
.background-image {
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
}

.category-container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-right: 140px;
}
.category {
  font-size: 24px;
  font-weight: bold;
  margin: 5px 15px;
  cursor: pointer;
  transition: color 0.3s;
}
/* hover 수정 */
.category:hover {
  color: skyblue;
}

.v-card {
  transition: opacity 0.5s ease-in-out;
  opacity: 1; /* 초기에 선명하게 설정 */
  width: 50%;
  height: 50%;
  border-radius: 10px;
}

.v-card.on-hover {
  width: 70%;
  height: 70%;
}

.place-name {
  font-size: 15px;
  font-weight: bold;
  background-color: rgba(100, 100, 100, 0.4);
  color: white;
  position: absolute;
  bottom: -25px;
  left: -5px;
  display: flex;
  border-radius: 5px;
  letter-spacing: -1px;
  line-height: 2;
  margin: 0 0 30px 10px;
}
/* linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)), */
</style>

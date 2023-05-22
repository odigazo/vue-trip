<template>
  <div>
    <hr />
    <v-container>
      <div style="width: 1100px" class="d-flex justify-end">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              color="primary"
              x-large
              outlined
              v-bind="attrs"
              v-on="on"
              >추천 받기</v-btn
            >
          </template>

          <template v-slot:default="dialog">
            
            <v-card>
              <v-toolbar color="blue" dark style="font-size: larger">여행지 추천</v-toolbar>
              <div style="margin-left : 10px;">
                <v-container>

                <br>
                <v-spacer style="font-weight: bold">여행 출발일</v-spacer>
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      style="font-weight : 500; width: 550px;"
                      v-model="startDate"
                      label="날짜"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>

                <v-spacer style="font-weight: bold">여행 종료일</v-spacer>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      style="font-weight : 500; width: 550px;"  
                      v-model="endDate"
                      label="날짜"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                
                <v-spacer style="font-weight: bold">여행 목적</v-spacer>
                <v-select 
                style="font-weight : 500; width: 550px;"
                v-model="purpose" 
                label="목적 선택"
                :items="purposeOptions" 
                item-text="text" 
                item-value="value"></v-select>

                <v-spacer style="font-weight: bold">거리</v-spacer>
                <v-select 
                style="font-weight : 500; width: 550px;"
                v-model="distance" 
                label="거리 여부"
                :items="distanceOptions" 
                item-text="text" 
                item-value="value"></v-select>
                </v-container>
              </div>

              <v-card-actions class="justify-end">
                 <v-btn text color="primary" style="font-weight: 550" @click="recommend()">추천받기</v-btn>
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>

      <v-sheet class="mx-auto" elevation="8" max-width="1030">
        <h1 class="slide-title">거리순</h1>
        <v-slide-group class="pa-4" active-class="success" show-arrows>
          <v-slide-item
            v-for="(place, i) in $store.getters.getPlaceList"
            :key="i"
          >
            <v-card class="ma-4" height="160" width="190">
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
                          :style="{ visibility: hover ? 'visible' : 'hidden' }"
                        >
                          {{ place.placeName }}
                        </p>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <v-sheet class="mx-auto" elevation="8" max-width="1030">
        <h1 class="slide-title">나와 성향이 비슷한 사람들의 추천지</h1>
        <v-slide-group class="pa-4" active-class="success" show-arrows>
          <v-slide-item
            v-for="(place, i) in $store.getters.getRecommendLikeList"
            :key="i"
          >
            <v-card class="ma-4" height="160" width="190">
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
                          :style="{ visibility: hover ? 'visible' : 'hidden' }"
                        >
                          {{ place.placeName }}
                        </p>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-sheet class="mx-auto" elevation="8" max-width="1030">
        <h1 class="slide-title">인기순</h1>
        <v-slide-group class="pa-4" active-class="success" show-arrows>
          <v-slide-item
            v-for="(place, i) in $store.getters.getRecentCourseList"
            :key="i"
          >
            <v-card class="ma-4" height="160" width="190">
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
                          :style="{ visibility: hover ? 'visible' : 'hidden' }"
                        >
                          {{ place.placeName }}
                        </p>
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startDate: "",
      menu1: "",
      endDate: "",
      menu2: "",
      purpose: "",
      distance: "",
      purposeOptions: [
      { text: "자연 속 여행", value: "자연 속 여행" },
      { text: "가족 여행", value: "가족 여행" },
      { text: "역사와 문화 여행", value: "역사와 문화 여행" },
      { text: "축제와 이벤트 여행", value: "축제와 이벤트 여행" }],
      distanceOptions: [
      { text: "가까운 곳", value: "가까운 곳" },
      { text: "상관없음", value: "상관없음" },]
    };
  },
  watch : {
    purpose() {
      console.log(this.purpose);
    },
    distance() {
      console.log(this.distance);
    }
  },
  methods: {
    recommend() {
      let userInfo = this.$store.getters.getUserInfo;
      console.log(userInfo);
      if (
        this.checkEmpty(this.startDate) &&
        this.checkEmpty(this.endDate) &&
        this.checkEmpty(this.purpose) &&
        this.checkEmpty(this.distance)
      ) {
        this.$axios({
          url: "http://dapi.kakao.com/v2/local/search/address.json",
          method: "GET",
          headers: {
            Authorization: "KakaoAK 28129ad995eebba2852f3ad70480cfaa",
            "content-type": "application/json",
          },
          params: {
            query: userInfo.userAddr, //사용자의 주소
          },
          withCredentials: false,
          responseType: "json",
        }).then(
          function (result) {
            let longitude = result.data.documents[0].road_address.x;
            let latitude = result.data.documents[0].road_address.y;
            this.$axios({
              url: "http://localhost:8080/trip/mainPage/recommendInput",
              method: "GET",
              params: {
                startDate: this.startDate,
                endDate: this.endDate,
                purpose: this.purpose,
                distance: this.distance,
                longitude: longitude,
                latitude: latitude,
                userNum: userInfo.userNum,
              },
              responseType: "json",
            }).then(
              function (detail) {
                let placeDetail = detail.data;
                this.$axios({
                  url: "https://dapi.kakao.com/v2/local/search/keyword.json",
                  method: "GET",
                  params: {
                    query: placeDetail.placeName,
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
          }.bind(this)
        );
      } else {
        alert("입력란을 모두 작성해주세요!");
      }
    },
    checkEmpty(input) {
      if (input == "") {
        console.log(input);
        return false;
      } else {
        return true;
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
              if (result.data.documents.length !== 0) {
                placeDetail.placeUrl = result.data.documents[0].place_url;
              }
              this.$store.commit("setTripDetail", placeDetail);
              this.$router.push({ name: "tripDetail" });
            }.bind(this)
          );
        }.bind(this)
      );
    }
  },
};
</script>


<style scoped>
.mx-auto {
  margin-top: 2%;
  padding-top: 5px;
  /* box-shadow: none !important; */
}
.slide-title {
  font-family: "Your Desired Font", sans-serif;
  font-weight: bold;
  font-size: 25px;
  margin-left: 20px;
  text-align: center;
}
.pa-4 {
  padding: 16px; /* 슬라이드 그룹 패딩 */
}

.on-hover {
  background-color: #f0f0f0; /* 호버 시 배경색 */
}

.place-name {
  font-size: 16px; /* 장소명 글자 크기 */
  font-weight: bold;
  background-color: rgba(100, 100, 100, 0.6);
  color: white; /* 장소명 글자색 */
  position: absolute;
  display: flex;
  border-radius: 5px;
  letter-spacing: -1px;
  line-height: 2;
  margin-bottom: 0; /* 장소명 아래 여백 */
  margin: auto;
}

.category-label {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.recommend-button {
  background-color: #333;
  color: #fff;
  margin-top: 20px;
  border-radius: 4px;
  padding: 10px 20px;
}
</style>


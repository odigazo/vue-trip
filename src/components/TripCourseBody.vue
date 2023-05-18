<template>
  <div class="tripcoursebody text-center">
    <hr />
    <div>
      <div>
        <br />
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
                v-bind="attrs"
                v-on="on"
              >
                재추천받기
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">상세 여행 정보</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="출발일"
                        v-model.lazy="startDate"
                        hide-details="auto"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="복귀일"
                        v-model.lazy="endDate"
                        hide-details="auto"
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        :items="purposes"
                        label="여행목적"
                        required
                        v-model="selectedPurpose"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  닫기
                </v-btn>
                <v-btn color="blue darken-1" text @click="newCourse()">
                  저장
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn class="ma-2" outlined color="indigo" @click="selectCourse"
            >코스 담기</v-btn
          >
        </v-row>
        <br />
      </div>
    </div>
    <div v-if="$store.getters.getIsLoading">
      <img src="../assets/image/Searching.gif" />
      <div>최적의 코스를 찾는 중입니다...</div>
    </div>
    <div v-else>
      <v-timeline>
        <v-timeline-item
          v-for="(values, key) in $store.getters.getCourseMap"
          :key="key"
          color="blue"
          small
        >
          <!-- <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold blue--text`"
              v-text="key"
            ></span>
          </template> -->
          <v-card>
            <v-card-title class="blue lighten-2">
              <h2
                class="text-h4 white--text font-weight-light"
                v-text="key"
              ></h2>
            </v-card-title>
            <v-card-text>
              <ul class="items">
                <li v-for="(answer, i) in values" :key="i">
                  {{ answer }}
                </li>
              </ul>
              
              <!-- <v-stepper non-linear>
                <v-stepper-header>
                  <template v-for="(answer, i) in values">
                    <v-stepper-step
                      :key="i"
                      :step="(i + 1).toString()"
                      complete
                      complete-icon=""
                      class="step-text"
                    >
                      {{ answer }}
                    </v-stepper-step>

                    <v-divider
                      v-if="i !== values.length - 1"
                      :key="'divider-' + i"
                    ></v-divider>
                  </template>
                </v-stepper-header>
              </v-stepper> -->
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <br />
      <div>
        <div v-if="$store.getters.getIsMapReady">
          <v-btn class="ma-2" outlined color="indigo" @click="kakaomap">
            지도 보기
          </v-btn>
        </div>
        <div v-else>
          <img src="../assets/image/worldmap.gif" />
        </div>
      </div>
    </div>

    <div class="map" id="map" style="height: 500px"></div>
  </div>
</template>

<script>
import axios from "axios";
const API_KEY = process.env.VUE_APP_API_KEY;
const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

export default {
  name: "TripCourseView",
  data() {
    return {
      prompt:
        " 여행코스를 하루에 최소 3군데 이상 방문하고 싶어 날짜 - 시간 : 장소의 형태로 장소에 대한 설명은 생략해서 알려줘요. ex) 날짜 - 09:00~11:00 : 관광지명",
      maxTokens: 2000,
      temperature: 0.2,
      error: "",
      lastQuestion: "",
      lastAnswer: "",
      startDate: "",
      endDate: "",
      purposes: [
        "자연 속 여행",
        "역사와 문화 여행",
        "가족 여행",
        "축제와 이벤트 여행",
      ],
      selectedPurpose: "",
      dialog: false,
    };
  },
  methods: {
    newCourse() {
      this.dialog = false;
      this.generateText(
        this.startDate +
          "부터 " +
          this.endDate +
          "까지 " +
          this.selectedPurpose +
          "목적으로 여행을 가고싶어. "
      );
    },
    selectCourse() {
      axios
        .post(this._baseUrl + "courseBoard/insertCourse", {
          userNum: this.$store.getters.getUserInfo.userNum,
          // placeName : this.$store.getters.getTripDetail.placeName,
          courseTitle:
            this.$store.getters.getTripDetail.placeName +
            " " +
            this.selectedPurpose,
          courseContents: this.$store.getters.getSchedule,
        })
        .then((result) => {
          if (result.data == 1) {
            console.log("코스 담기 성공");
          }
          // console.log(result.data);
          // this.$store.commit("setSchedule", result.data);
          // this.$store.commit("setIsLoading", false);
        })
        .catch(function () {
          console.log("fail");
        });
    },
    kakaomap() {
      if (window.kakao && window.kakao.maps) {
        console.log("초기화");
        this.initMap();
      } else {
        console.log("동적생성");
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
          "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0f688919e439c6921bf946888799172e";
        document.head.appendChild(script);
      }
    },
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(
          this.$store.state.latitudes[0],
          this.$store.state.longitudes[0]
        ),
        level: 8,
      };

      var map = new kakao.maps.Map(container, options);
      for (var i = 1; i < this.$store.getters.getNames.length; i++) {
        var markerPosition = new kakao.maps.LatLng(
          this.$store.state.latitudes[i],
          this.$store.state.longitudes[i]
        );
        var marker = new kakao.maps.Marker({
          map: map,
          position: markerPosition,
          title: this.$store.state.names[i],
        });
        console.log(marker);
        var infowindow = new kakao.maps.InfoWindow({
          content: this.$store.state.names[i], // 인포윈도우에 표시할 내용
        });
        (function (marker, infowindow) {
          // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
          kakao.maps.event.addListener(marker, "mouseover", function () {
            infowindow.open(map, marker);
          });

          // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });
        })(marker, infowindow);
        marker.setMap(map);
      }
    },

    async generateText(detail) {
      this.$store.commit("setIsLoading", true);
      this.$store.commit("setIsMapReady", false);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        withCredentials: false,
      };

      const body = {
        prompt:
          "너는 여행 스케쥴러야 " +
          detail +
          this.$store.getters.getAddrStr +
          " 의 관광지들 중에서" +
          this.$store.getters.getTripDetail.placeName +
          "를 포함하는 " +
          // this.$store.getters.getTripDetail.placeAddress.split(" ")[0] +
          this.prompt,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      };

      try {
        const response = await axios.post(API_URL, body, config);
        const answer = response.data.choices[0].text;
        console.log(answer);
      } catch (error) {
        this.error = error.message;
      }
      axios
        .get(this._baseUrl + "course/schedule", {
          params: {
            answer: this.$store.getters.getAnswer,
          },
        })
        .then((result) => {
          console.log(result);
          this.$store.commit("setSchedule", result.data.list);
          this.$store.commit("setCourseMap", result.data.tripmap);
          this.$store.commit("setIsLoading", false);
          axios
            .get(this._baseUrl + "course/map", {
              params: {
                answer: this.$store.getters.getAnswer,
              },
            })
            .then((result2) => {
              console.log(result2);
              this.$store.commit("setNames", result2.data.names);
              this.$store.commit("setLatitudes", result2.data.latitudes);
              this.$store.commit("setLongitudes", result2.data.longitudes);
              if (this.$store.getters.getNames != null) {
                this.$store.commit("setIsMapReady", true);
              }
            })
            .catch(function () {
              console.log("fail");
            });
        })
        .catch(function () {
          console.log("fail 스케쥴 저장");
        });
    },
  },
};
</script>

<style scoped>
div.map {
  align-content: center;
}

.items > li {
  list-style: none;
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>

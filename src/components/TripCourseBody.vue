<template>
  <div class="tripcoursebody">
    <div>
      <modal name="myModal">
        <div>
          <h3>{{ $store.getters.getUserInfo.userNickname }}님의 여행 스타일</h3>
          <p>원하시는 여행에 대한 상세 정보를 입력해주세요</p>
          <div>
            <span>출발일</span>
            <div>
              <input type="date" v-model.lazy="startDate" />
            </div>
          </div>
          <div>
            <span>복귀일</span>
            <div>
              <input type="date" v-model.lazy="endDate" />
            </div>
          </div>
          <div>
            <span>여행목적</span>
            <div>
              <select v-model="selectedPurpose">
                <option v-for="purpose in purposes" :key="purpose">
                  {{ purpose }}
                </option>
              </select>
            </div>
          </div>
          <button @click="newCourse">코스 보러가기</button>
          <button @click="$modal.hide('myModal')">닫기</button>
        </div>
      </modal>
      <div>
        <button @click="$modal.show('myModal')">재추천 받기</button>
        <button @click="selectCourse">코스 담기</button>
      </div>
    </div>
    <div v-if="$store.getters.getIsLoading">
      <img src="../assets/image/Searching.gif" />
      <div>최적의 코스를 찾는 중입니다...</div>
    </div>
    <div v-else>
      <ul>
        <li v-for="(answer, i) in $store.getters.getSchedule" :key="i">
          {{ answer }}
        </li>
      </ul>
    </div>
    <!-- <div>{{ chat }}</div> -->
    <button v-if="$store.getters.getIsMapReady" @click="kakaomap">
      지도 보기
    </button>
    <div class="map" id="map" style="height: 500px"></div>
  </div>
</template>

<script>
import axios from "axios";
const API_KEY = "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";
const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

export default {
  name: "TripCourseView",
  data() {
    return {
      prompt:
        "의 반경 50km 안에서 여행하는 여행코스를 날짜, 시간 : 장소의 형태로 장소에 대한 설명은 생략해서 알려줘요.",
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
    };
  },
  methods: {
    newCourse() {
      this.generateText(
        this.startDate +
          "부터 " +
          this.endDate +
          "까지 " +
          this.selectedPurpose +
          "목적으로 "
      );
      this.$modal.hide("myModal");
    },
    selectCourse() {
      axios
        .post(this._baseUrl + "courseBoard/insertCourse", {
            userNum : this.$store.getters.getUserInfo.userNum,
            // placeName : this.$store.getters.getTripDetail.placeName,
            courseTitle : this.$store.getters.getTripDetail.placeName + this.selectedPurpose,
            courseContents : this.$store.getters.getSchedule
        })
        .then((result) => {
          if(result.data==1){
            console.log('코스 담기 성공');
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
        prompt: "너는 여행 스케쥴러야 " + detail +  this.$store.getters.getTripDetail.placeName +"를 포함한 "+ this.$store.getters.getTripDetail.placeAddress.split(" ")[0] + this.prompt,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      };

      try {
        const response = await axios.post(API_URL, body, config);
        const answer = response.data.choices[0].text;
        console.log(answer);
        axios
          .get(this._baseUrl + "course/schedule", {
            params: {
              answer: response.data.choices[0].text,
            },
          })
          .then((result) => {
            console.log(result);
            this.$store.commit("setSchedule", result.data);
            this.$store.commit("setIsLoading", false);
          })
          .catch(function () {
            console.log("fail");
          });
        // this.chat = answer;
        // this.lastQuestion = this.lastQuestion + this.prompt;
        // this.lastAnswer = answer;
        var newbody = {
          prompt:
            answer +
            "이 코스에서 관광지명만 추출해서 관광지명 : 해당 관광지의 각기 다른 정확한 위도,경도 형태로 출력해줘요. ex) 부산 자연과학박물관 : 35.170931,129.170771",
          max_tokens: this.maxTokens,
          temperature: this.temperature,
        };
        const response2 = await axios.post(API_URL, newbody, config);
        console.log(response2.data.choices[0]);
        axios
          .get(this._baseUrl + "course/map", {
            params: {
              answer: response2.data.choices[0].text,
            },
          })
          .then((result) => {
            console.log(result);
            this.$store.commit("setNames", result.data.names);
            this.$store.commit("setLatitudes", result.data.latitudes);
            this.$store.commit("setLongitudes", result.data.longitudes);
            if (this.$store.getters.getNames != null) {
              this.$store.commit("setIsMapReady", true);
            }
          })
          .catch(function () {
            console.log("fail");
          });
      } catch (error) {
        this.error = error.message;
      }
      this.prompt = "";
    },
  },
};
</script>
<style scoped>
div.map {
  align-content: center;
}
</style>

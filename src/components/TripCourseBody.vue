<template>
  <div class="tripcoursebody">
    <div>
      <label for="prompt">Enter your prompt:</label>
      <input
        type="text"
        id="prompt"
        v-model="prompt"
        @keyup.enter="generateText"
      />
      <button @click="generateText">Send</button>
    </div>
    <div v-if="isLoading">
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
    <button v-if="mapReady" @click="kakaomap">지도 보기</button>
    <div class="map" id="map" style="height: 500px"></div>
  </div>
</template>

<script>
import axios from "axios";

const API_KEY = "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";
const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";
// const SPRITE_MARKER_URL = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png';
// var defaultImage = new kakao.maps.MarkerImage(
//         SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
//         new kakao.maps.Size(33, 36), // 마커의 크기
//     );
// var overImage = new kakao.maps.MarkerImage(
//         SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
//         new kakao.maps.Size(40, 42), // 마커의 크기
//     );
export default {
  name: "TripCourseView",
  data() {
    return {
      prompt:
        "40계단 테마거리를 포함한 부산의 자연풍경을 구경할 수 있는 여행의 2박 3일 코스를 날짜, 시간 : 장소의 형태로 장소에 대한 설명은 생략해서 알려줘요.",
      maxTokens: 2000,
      temperature: 0.2,
      error: "",
      lastQuestion: "",
      lastAnswer: "",
      mapReady: false,
      isLoading: false,
    };
  },
  methods: {
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

    async generateText() {
      this.isLoading = true;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        withCredentials: false,
      };

      const body = {
        prompt: "너는 여행 스케쥴러야 " + this.lastQuestion + this.prompt,
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
            this.isLoading = false;
          })
          .catch(function () {
            console.log("fail");
          });
        // this.chat = answer;
        this.lastQuestion = this.lastQuestion + this.prompt;
        this.lastAnswer = answer;
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
              this.mapReady = true;
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
  mounted() {
    if (this.$store.getters.getNames != null) {
      this.mapReady = true;
    } else {
      this.mapReady = false;
    }
  },
};
</script>
<style scoped>
div.map {
  align-content: center;
}
</style>

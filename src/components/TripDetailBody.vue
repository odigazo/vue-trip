<template>
  <div class="container">
    <div class="image-container">
      <img
        :src="$store.getters.getTripDetail.imageUrl"
        alt="Image"
        style="height: 500px; width: 600px"
      />
    </div>
    <div class="description-container">
      <h1 style="text-align: left">
        {{ $store.getters.getTripDetail.placeName }}
      </h1>
      <font>{{ $store.getters.getTripDetail.placeAddress }}</font>
      <font style="text-align: left">{{
        $store.getters.getTripDetail.placeContents
      }}</font>
      <a v-if="urlCheck" :href="$store.getters.getTripDetail.placeUrl"
        >여행지 리뷰 확인하러 가기</a
      >
      <div id="map" style="width: 500px; height: 300px"></div>
    </div>
    <button @click="courseRecommend">코스 추천받기</button>
  </div>
</template>
<script>
import axios from "axios";

const API_KEY = process.env.API_KEY;
const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";
export default {
  data() {
    return {
      urlCheck: false,
      prompt:"의 반경 50km 안에서 자연풍경을 구경할 수 있는 여행의 2박 3일 코스를 날짜, 시간 : 장소의 형태로 장소에 대한 설명은 생략해서 알려줘요.",
      maxTokens: 2000,
      temperature: 0.2,
      error: "",
      lastQuestion: "",
      lastAnswer: "",
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ee8c5959853eafd5cbe842ca8ad1b34c";
      document.head.appendChild(script);
    }
  },
  methods: {
    courseRecommend() {
      this.generateText();
      this.$router.push({ name: "tripcourse" });
    },
    initMap() {
      let container = document.getElementById("map");
      let options = {
        center: new kakao.maps.LatLng(
          this.$store.getters.getTripDetail.latitude,
          this.$store.getters.getTripDetail.longitude
        ),
        level: 3,
      };

      let map = new kakao.maps.Map(container, options);

      let markerPosition = new kakao.maps.LatLng(
        this.$store.getters.getTripDetail.latitude,
        this.$store.getters.getTripDetail.longitude
      );
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map); //마커를 지도에 표시
    },
    async generateText() {
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
        prompt: "너는 여행 스케쥴러야 " + this.$store.getters.getTripDetail.placeName +"를 포함한 "+ this.$store.getters.getTripDetail.placeAddress.split(" ")[0] + this.prompt,
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
  created() {
    if (typeof this.$store.getters.getTripDetail.placeUrl != "undefined") {
      this.urlCheck = true;
    }
  },
};
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
}

.image-container {
  flex: 1;
}

.description-container {
  flex: 1;
  padding: 0 20px;
}
</style>
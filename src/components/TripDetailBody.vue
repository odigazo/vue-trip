<template>
  <div>
    <hr />
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
      <v-btn @click="courseRecommend">코스 추천받기</v-btn>
    </div>
  </div>
</template>
<script>
import axios from "axios";

const API_KEY = process.env.VUE_APP_API_KEY;
// const API_KEY = "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";
const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";
export default {
  data() {
    return {
      urlCheck: false,
      prompt:
        " 자연풍경구경 목적의 2박 3일 여행 코스를 하루에 최소 3곳 최대 5곳 방문하도록 여행일차 # 시간 : 장소의 형태로 장소에 대한 설명은 생략해서 알려줘요. ex) 1일차 # 09:00~11:00 : 관광지",
      maxTokens: 2000,
      temperature: 0.2,
      error: "",
      // lastQuestion: "",
      // answer: "",
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
      axios
        .get(this._baseUrl + "course/getfacts", {
          params: {
            addr: this.$store.getters.getTripDetail.placeAddress.split(" ")[0],
          },
        })
        .then((result) => {
          console.log(result.data);
          this.$store.commit("setAddrStr", result.data);
          this.generateText();
          this.$router.push({ name: "tripcourse" });
        })
        .catch(function () {
          console.log("fail");
        });
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
        prompt:
          "너는 여행 스케쥴러야 " +
          this.$store.getters.getAddrStr +
          " 의 관광지들 중에서 " +
          this.$store.getters.getTripDetail.placeName +
          " 을(를) 포함하여 " +
          this.prompt,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      };

      try {
        const response = await axios.post(API_URL, body, config);
        const answer = response.data.choices[0].text;
        this.$store.commit("setAnswer", answer);
        console.log(answer);
        console.log(body.prompt);
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
<template>
  <div>
    <hr />
    <div class="container">
      <div class="image-container">
        <img
          :src="$store.getters.getTripDetail.imageUrl"
          alt="Image"
          class="detailImage"
        />
      </div>
      <div class="description-container">
        <h2 style="text-align: left">
          {{ $store.getters.getTripDetail.placeName }}
        </h2>
        <br>
        <div class="font-weight-medium">
          <h3>상세정보</h3>
          <hr style="border-top: 1px solid #ccc; font-size: larger;">
        </div>
        <br>
        <font class="font-weight-bold">{{$store.getters.getTripDetail.placeAddress }}</font>
        <br>
        <font  style="text-align: left">{{
          $store.getters.getTripDetail.placeContents
        }}</font>
        <br>
        <br>
        <v-btn v-if="urlCheck" :href="$store.getters.getTripDetail.placeUrl" outlined color="primary" class="font-weight-bold">여행지 리뷰 확인하러 가기</v-btn>
        <v-btn @click="courseRecommend" style="margin-left: 2%;" outlined color="primary" class="font-weight-bold">코스 추천받기</v-btn>
        <br>
        <br>
        <div id="map" style="width: 550px; height: 330px; border-radius: 4px;"></div>
      </div>
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
        "",
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
      if(this.$store.getters.getAdditionalInfo.length>0){
        this.prompt = "너는 여행 스케쥴러야 " +
          this.$store.getters.getAdditionalInfo +
          this.$store.getters.getAddrStr +
          " 의 관광지들 중에서 " +
          this.$store.getters.getTripDetail.placeName +
          " 을(를) 포함하고, " +
          "오전 11시부터 밤 10시까지 여행하는데 12:00~14:00시, 18:00~20:00시는 식사시간으로 해서 여행코스를 짜줘 날짜 # 시간 : 장소의 형태로 장소에 대한 설명은 생략해서 알려줘요. ex) 2023.05.12 # 09:00~11:00 : 관광지"
      }else{
        this.prompt = "너는 여행 스케쥴러야 " +
          this.$store.getters.getAddrStr +
          " 의 관광지들 중에서 " +
          this.$store.getters.getTripDetail.placeName +
          " 을(를) 포함하여 " +
          "자연풍경구경 목적의 2박 3일 여행 코스를 하루에 최소 3곳 최대 5곳 방문하도록 여행일차 # 시간 : 장소의 형태로 장소에 대한 설명은 생략해서 알려줘요. ex) 1일차 # 09:00~11:00 : 관광지"
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        withCredentials: false,
      };

      const body = {
        prompt: this.prompt,
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
              this.$store.commit("setAdditionalInfo",'');
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
  margin-top: 5%;
}

.detailImage {
  border-radius: 4px;
  height: 600px; 
  width: 600px;
}
.image-container {
  flex: 1;
  margin-right: 2%;
}

.description-container {
  flex: 1;
  padding: 0 20px;
}
</style>
<template>
  <div>
<tiny-slider ref="slider" :mouse-drag="true" :loop="false" :autoplay= "false" items="3"
gutter="20" speed="1000" id="my-slider" style="display:flex;" :controls="false" :nav="false">
  <div style="height : 400px;" v-for="(place, i) in $store.getters.getRecommendList" :key="i">
    <img :src="place.thumnailUrl" style="height: 250px; width: 300px; background : yellow; margin: auto;" @click="tripDetail(place.placeName)">
    <div>
      <font>{{place.placeName}}</font>
    </div>
  </div>
</tiny-slider>

<tiny-slider ref="like-slider" :mouse-drag="true" :loop="false" :autoplay= "false" items="3"
gutter="20" speed="1000" id="my-slider" style="display:flex;" :controls="false" :nav="false">
  <div style="height : 400px;" v-for="(place, i) in $store.getters.getRecommendLikeList" :key="i">
    <img :src="place.thumnailUrl" style="height: 250px; width: 300px; background : yellow; margin: auto;" @click="tripDetail(place.placeName)">
    <div>
      <font>{{place.placeName}}</font>
    </div>
  </div>
</tiny-slider>

<tiny-slider ref="like-slider" :mouse-drag="true" :loop="false" :autoplay= "false" items="3"
gutter="20" speed="1000" id="my-slider" style="display:flex;" :controls="false" :nav="false">
  <div style="height : 400px;" v-for="(place, i) in $store.getters.getRecentCourseList" :key="i">
    <img :src="place.thumnailUrl" style="height: 250px; width: 300px; background : yellow; margin: auto;" @click="tripDetail(place.placeName)">
    <div>
      <font>{{place.placeName}}</font>
    </div>
  </div>
</tiny-slider>
<button @click="recommendInput()">추천 받기</button>
  </div>
</template>
<script>
import VueTinySlider from 'vue-tiny-slider';

export default {
    components: {
        'tiny-slider': VueTinySlider
    },
    methods : {
      tripDetail(placeName) {
        this.$axios({
            url: this._baseUrl+"mainPage/detail",
            method: "GET",
            params : {
                placeName : placeName
            },
            responseType: "json"
        }).then(function(detail) {
            let placeDetail = detail.data;
            this.$axios({
                url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
                method: 'GET',
                params: {
                    query : placeName
                },
                headers: {Authorization: 'KakaoAK 28129ad995eebba2852f3ad70480cfaa'},
                withCredentials: false,
                responseType: 'json'
            }).then(function(result) {

                if (result.data.documents.length != 0) {
                    placeDetail.placeUrl = result.data.documents[0].place_url;
                }
                this.$store.commit("setTripDetail", placeDetail);
                this.$router.push({name:"tripDetail"});
            }.bind(this));

        }.bind(this));
    },
    recommendInput() {
      this.$router.push({name:"recommendInput"});
    }
    }
}
</script>
<style>
  .tns-liveregion {
    display: none;
  }
/* scope으로 하면 안 됨(전역 component가 가진 요소이기 때문) */
</style>

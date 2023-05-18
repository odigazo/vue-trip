<template>
  <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="1000"
  >
    <v-slide-group
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(place, i) in $store.getters.getPlaceList"
        :key="i"
      >
        <v-card
          class="ma-4"
          height="160"
          width="190"
        >
          <v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" @click="tripDetail(place.placeName)">
              <v-img :src="place.thumnailUrl">
                <v-card-title class="text-h6 white--text">
                  <v-row class="fill-height flex-column" justify="space-between">
                    <p class="mt-4 subheading text-left place-name" :style="{ visibility: hover ? 'visible' : 'hidden' }">
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
</template>
    <!-- <button @click="recommendInput()">추천 받기</button> -->
    <!-- <tiny-slider ref="slider" :mouse-drag="true" :loop="false" :autoplay="false" items="3" gutter="10" speed="1000" id="my-slider" style="display:flex;" :controls="false" :nav="false">
      <div style="height: 200px;" v-for="(place, i) in $store.getters.getRecommendList" :key="i">
        <img :src="place.thumnailUrl" class="slideImg" @click="tripDetail(place.placeName)">
        <div>
          <font>{{ place.placeName }}</font>
        </div>
      </div>
    </tiny-slider>

    <tiny-slider ref="like-slider" :mouse-drag="true" :loop="false" :autoplay="false" items="3" gutter="20" speed="1000" id="my-slider" style="display:flex;" :controls="false" :nav="false">
      <div style="height: 200px;" v-for="(place, i) in $store.getters.getRecommendLikeList" :key="i">
        <img :src="place.thumnailUrl" class="slideImg" @click="tripDetail(place.placeName)">
        <div>
          <font>{{ place.placeName }}</font>
        </div>
      </div>
    </tiny-slider>

    <tiny-slider ref="like-slider" :mouse-drag="true" :loop="false" :autoplay="false" items="3" gutter="20" speed="1000" id="my-slider" style="display:flex;" :controls="false" :nav="false">
      <div style="height: 200px;" v-for="(place, i) in $store.getters.getRecentCourseList" :key="i">
        <img :src="place.thumnailUrl" class="slideImg" @click="tripDetail(place.placeName)">
        <div>
          <font>{{ place.placeName }}</font>
        </div>
      </div>
    </tiny-slider> -->
<script>
// import VueTinySlider from 'vue-tiny-slider';

export default {
  // components: {
  //   'tiny-slider': VueTinySlider
  // },
  methods: {
    tripDetail(placeName) {
      this.$axios({
        url: this._baseUrl + "mainPage/detail",
        method: "GET",
        params: {
          placeName: placeName
        },
        responseType: "json"
      }).then(function (detail) {
        let placeDetail = detail.data;
        this.$axios({
          url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
          method: 'GET',
          params: {
            query: placeName
          },
          headers: { Authorization: 'KakaoAK 28129ad995eebba2852f3ad70480cfaa' },
          withCredentials: false,
          responseType: 'json'
        }).then(function (result) {

          if (result.data.documents.length !== 0) {
            placeDetail.placeUrl = result.data.documents[0].place_url;
          }
          this.$store.commit("setTripDetail", placeDetail);
          this.$router.push({ name: "tripDetail" });
        }.bind(this));

      }.bind(this));
    },
    recommendInput() {
      this.$router.push({ name: "recommendInput" });
    }
  }
}
</script>


<style scoped>
.place-name {
  font-size: 15px;
  font-weight: bold;
  background-color: rgba(100, 100, 100, 0.6);
  color: white;
  position: absolute;
  /* bottom: -16px; */
  /* left: 0; */
  display: flex;
  border-radius: 5px;
  letter-spacing: -1px;
  line-height: 2;
  margin: auto;
}
</style>

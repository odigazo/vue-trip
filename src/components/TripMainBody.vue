<template>
  <div class="tripMainBody">
    <table style="margin: 0 auto">
      <tr v-for="(place, i) in placeList" :key="i" style="">
        <td @click="tripDetail(place.place1.placeName)">
            <img :src="place.place1.thumnailUrl" />
            <div>
                <font>{{place.place1.placeName}}</font>
            </div>
        </td>
        <td @click="tripDetail(place.place2.placeName)">
            <img :src="place.place2.thumnailUrl" />
            <div>
                <font>{{place.place2.placeName}}</font>
            </div>
        </td>
        <td @click="tripDetail(place.place3.placeName)">
            <img :src="place.place3.thumnailUrl" />
            <div>
                <font>{{place.place3.placeName}}</font>
            </div>
        </td>
        <td @click="tripDetail(place.place4.placeName)">
            <img :src="place.place4.thumnailUrl" />
            <div>
                <font>{{place.place4.placeName}}</font>
            </div>
        </td>
        <td @click="tripDetail(place.place5.placeName)">
            <img :src="place.place5.thumnailUrl" />
            <div>
                <font>{{place.place5.placeName}}</font>
            </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      placeList: [],
    };
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
                console.log(result.data.documents[0].place_url);
                placeDetail.placeUrl = result.data.documents[0].place_url;
                this.$store.state.detail = placeDetail;
                this.$router.push({name:"tripDetail"});
            }.bind(this));

        }.bind(this));
    }
  },
  created() {
    this.$axios({
      url: this._baseUrl+"mainPage",
      method: "GET",
      responseType: "json",
    }).then(
      function (places) {
        let list = places.data;
        for (let i = 0; i < list.length - 2; i += 5) {
          let threePlace = {};
          threePlace.place1 = list[i];
          threePlace.place2 = list[i + 1];
          threePlace.place3 = list[i + 2];
          threePlace.place4 = list[i + 3];
          threePlace.place5 = list[i + 4];
          this.placeList.push(threePlace);
        }
      }.bind(this)
    );
  },
};
</script>
<style scoped>
.tripMainBody td {
  position: relative;
}

.tripMainBody td:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>

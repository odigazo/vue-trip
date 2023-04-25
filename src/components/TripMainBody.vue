<template>
  <div class="tripMainBody">
    <div style="display:flex;">
        <h1 @click="searchCategory('전체')">#전체</h1>
        <h1 @click="searchCategory('spring')">#봄</h1>
        <h1 @click="searchCategory('summer')">#여름</h1>
        <h1 @click="searchCategory('autumn')">#가을</h1>
        <h1 @click="searchCategory('winter')">#겨울</h1>
    </div>
    <table style="margin: 0 auto">
      <tr v-for="(place, i) in $store.getters.getPlaceList" :key="i" style="">
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
        category : ''
    }
  },
  methods : {
    tripDetail(placeName) {
        this.$axios({
            url: "http://localhost:8080/trip/mainPage/detail",
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
    searchCategory(season) {
        this.category = season;
    }
  },
  created() {
    this.$axios({
      url: "http://localhost:8080/trip/mainPage",
      method: "GET",
      responseType: "json",
    }).then(
      function (places) {
        let list = places.data;
        let placeList = [];
        for (let i = 0; i < list.length - 4; i += 5) {
            let fivePlace = {};
            fivePlace.place1 = list[i];
            fivePlace.place2 = list[i + 1];
            fivePlace.place3 = list[i + 2];
            fivePlace.place4 = list[i + 3];
            fivePlace.place5 = list[i + 4];
            placeList.push(fivePlace);
        }
        this.$store.commit("setPlaceList", placeList);
        this.category = '전체';
      }.bind(this)
    );
  },
  watch : {
    category : function () {
        if (this.category == '전체') {
            this.$axios({
                url: "http://localhost:8080/trip/mainPage",
                method: "GET",
                responseType: "json",
            }).then(function (places) {
                let list = places.data;
                let placeList = [];
                for (let i = 0; i < list.length - 4; i += 5) {
                    let fivePlace = {};
                    fivePlace.place1 = list[i];
                    fivePlace.place2 = list[i + 1];
                    fivePlace.place3 = list[i + 2];
                    fivePlace.place4 = list[i + 3];
                    fivePlace.place5 = list[i + 4];
                    placeList.push(fivePlace);
                }
                this.$store.commit("setPlaceList", placeList);
            }.bind(this));
        }else {
            this.$axios({
                url: "http://localhost:8080/trip/mainPage/category",
                method: "GET",
                params: {
                    season : this.category
                },
                responseType: "json",
            }).then(function (places) {
                let list = places.data;
                let placeList = [];
                for (let i = 0; i < list.length - 4; i += 5) {
                    let fivePlace = {};
                    fivePlace.place1 = list[i];
                    fivePlace.place2 = list[i + 1];
                    fivePlace.place3 = list[i + 2];
                    fivePlace.place4 = list[i + 3];
                    fivePlace.place5 = list[i + 4];
                    placeList.push(fivePlace);
                }
                this.$store.commit("setPlaceList", placeList);
            }.bind(this));
        }
    }
  }
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
h1 {
    margin-right : 20px;
}
</style>
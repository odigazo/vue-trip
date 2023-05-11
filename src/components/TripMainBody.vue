<template>
  <div class="tripMainBody">
    <div class="category-container">
        <h1 class="category" @click="searchCategory('전체')">#전체</h1>
        <h1 class="category" @click="searchCategory('spring')">#봄</h1>
        <h1 class="category" @click="searchCategory('summer')">#여름</h1>
        <h1 class="category" @click="searchCategory('autumn')">#가을</h1>
        <h1 class="category" @click="searchCategory('winter')">#겨울</h1>
    </div>
    <table class="places-table">
      <tr v-for="(place, i) in $store.getters.getPlaceList" :key="i">
        <td class="place-card" @click="tripDetail(place.place1.placeName)">
            <img class="thumbnail" :src="place.place1.thumnailUrl" />
            <div class="place-name">
                <font>{{place.place1.placeName}}</font>
            </div>
        </td>
        <td class="place-card" @click="tripDetail(place.place2.placeName)">
            <img class="thumbnail" :src="place.place2.thumnailUrl" />
            <div class="place-name">
                <font>{{place.place2.placeName}}</font>
            </div>
        </td>
        <td class="place-card" @click="tripDetail(place.place3.placeName)">
            <img class="thumbnail" :src="place.place3.thumnailUrl" />
            <div class="place-name">
                <font>{{place.place3.placeName}}</font>
            </div>
        </td>
        <td class="place-card" @click="tripDetail(place.place4.placeName)">
            <img class="thumbnail" :src="place.place4.thumnailUrl" />
            <div class="place-name">
                <font>{{place.place4.placeName}}</font>
            </div>
        </td>
        <td class="place-card" @click="tripDetail(place.place5.placeName)">
            <img class="thumbnail" :src="place.place5.thumnailUrl" />
            <div class="place-name">
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
    searchCategory(season) {
        this.category = season;
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
    },
    
  }
};
</script>
<style scoped>
.tripMainBody {
  padding: 20px;
}
.category-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.category {
  font-size: 24px;
  font-weight: bold;
  margin: 5px 15px;
  cursor: pointer;
  transition: color 0.3s;
}
.category:hover {
  color: rgb(0, 166, 255);
}
.places-table {
  width: 100%;
  border-collapse: collapse;
}
.place-card {
  width: 20%;
  padding: 10px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  position: relative;
}
.thumbnail {
  width: 80%;
  height: auto;
  border-radius: 5px;
  margin: 0 auto;
}
.place-name {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>

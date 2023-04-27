<template>
  <div class="container">
    <div class="image-container">
      <img :src="$store.getters.getTripDetail.imageUrl" alt="Image" style="height : 500px; width : 600px;">
    </div>
    <div class="description-container">
      <h1 style="text-align: left;">{{$store.getters.getTripDetail.placeName}}</h1>
      <font>{{$store.getters.getTripDetail.placeAddress}}</font>
      <font style="text-align: left;">{{$store.getters.getTripDetail.placeContents}}</font>
      <a v-if="urlCheck" :href="$store.getters.getTripDetail.placeUrl">여행지 리뷰 확인하러 가기</a>
      <div id="map" style="width:500px;height:300px;"></div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            urlCheck : false
        }
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ee8c5959853eafd5cbe842ca8ad1b34c';
            document.head.appendChild(script);
        }
    },
    methods: {
        initMap() {
            let container = document.getElementById('map');
            let options = {
                center: new kakao.maps.LatLng(this.$store.getters.getTripDetail.longitude, this.$store.getters.getTripDetail.latitude),
                level: 3
            };

            let map = new kakao.maps.Map(container, options);

            let markerPosition  = new kakao.maps.LatLng(this.$store.getters.getTripDetail.longitude, this.$store.getters.getTripDetail.latitude); 
            let marker = new kakao.maps.Marker({
                    position: markerPosition
            });

            marker.setMap(map); //마커를 지도에 표시 

        }
    },
    created(){
        if(typeof(this.$store.getters.getTripDetail.placeUrl) != 'undefined') {
            this.urlCheck = true;
        }
    }
}
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
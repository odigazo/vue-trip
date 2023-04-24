<template>
  <div class="container">
    <div class="image-container">
      <img :src="detail.imageUrl" alt="Image">
    </div>
    <div class="description-container">
      <h1 style="text-align: left;">{{detail.placeName}}</h1>
      <font>{{detail.placeAddress}}</font>
      <font style="text-align: left;">{{detail.placeContents}}</font>
      <a :href="detail.placeUrl">여행지 리뷰 확인하러 가기</a>
      <div id="map" style="width:500px;height:300px;"></div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            detail : this.$store.state.detail
        }
    },
   mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0f688919e439c6921bf946888799172e';
            document.head.appendChild(script);
        }
    },
    methods: {
        initMap() {
            var container = document.getElementById('map');
            var options = {
              center: new kakao.maps.LatLng(this.detail.latitude, this.detail.longitude),
              level: 3
            };

            var map2 = new kakao.maps.Map(container, options);

            var markerPosition  = new kakao.maps.LatLng(this.detail.latitude, this.detail.longitude); 
            var marker = new kakao.maps.Marker({
                 position: markerPosition
            });
            marker.setMap(map2);

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
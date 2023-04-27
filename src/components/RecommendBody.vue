<template>
  <div>
<div>
  <button @click="slider.prev()">Prev</button>
  <button @click="slider.next()">Next</button>
</div>

<tiny-slider ref="slider" :mouse-drag="true" :loop="false" :autoplay= "false" items="3"
gutter="20" speed="1000" id="my-slider" style="display:flex;" :controls="false" :nav="false">
  <div style="height : 400px;" v-for="(place, i) in $store.getters.getRecommendList" :key="i"><img :src="place.thumnailUrl" style="height: 365px; width: 375px; background : yellow; margin: auto;"></div>
</tiny-slider>
  </div>
</template>
<script>
import VueTinySlider from 'vue-tiny-slider';

export default {
    components: {
        'tiny-slider': VueTinySlider
    }
}
</script>
<style>
  .tns-liveregion {
    display: none;
  }
/* scope으로 하면 안 됨(전역 component가 가진 요소이기 때문) */
</style>

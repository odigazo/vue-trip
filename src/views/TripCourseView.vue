<template>
  <div class="tripcourse">
    <MainHeader2></MainHeader2>
    <TripCourseBody></TripCourseBody>
  </div>
</template>

<script>
import MainHeader2 from '@/components/MainHeader2.vue' 
import TripCourseBody from '@/components/TripCourseBody.vue'
export default ({
  name:'TripCourseView',
  components:{
    MainHeader2,
    TripCourseBody
  }
})
</script>
<style>

</style>
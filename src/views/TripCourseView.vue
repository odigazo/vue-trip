<template>
  <div class="tripcourse">
    <MainHeader></MainHeader>
    <TripCourseBody></TripCourseBody>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue' 
import TripCourseBody from '@/components/TripCourseBody.vue'
export default ({
  name:'TripCourseView',
  components:{
    MainHeader,
    TripCourseBody
  }
})
</script>
<style>

</style>
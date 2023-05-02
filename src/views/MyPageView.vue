<template>
  <div class="tripcourse">
    <MainHeader2></MainHeader2>
    <MyPageBody></MyPageBody>
  </div>
</template>

<script>
import MainHeader2 from '@/components/MainHeader2.vue' 
import MyPageBody from '@/components/MyPageBody.vue'
export default ({
  name:'TripCourseView',
  components:{
    MainHeader2,
    MyPageBody
  }
})
</script>
<style>

</style>
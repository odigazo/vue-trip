<template>
  <div class="courseboardList">
    <MainHeader2></MainHeader2>
    <courseboardListBody></courseboardListBody>
  </div>
</template>

<script>
import MainHeader2 from '../components/MainHeader2.vue'; 
import courseboardListBody from '@/components/courseboardListBody.vue'
export default ({
  name:'courseboardListView',
  components:{
    MainHeader2,
    courseboardListBody
  }
})
</script>


<style>

</style>






<template>
  <div class="courseboardList">
    <MainHeader></MainHeader>
    <courseboardListBody></courseboardListBody>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'; 
import courseboardListBody from '@/components/courseboardListBody.vue'
export default ({
  name:'courseboardListView',
  components:{
    MainHeader,
    courseboardListBody
  }
})
</script>


<style>

</style>






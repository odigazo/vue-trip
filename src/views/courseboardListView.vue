<template>
  <div class="courseboardList">
    <courseboardListHeader></courseboardListHeader>
    <courseboardListBody></courseboardListBody>
  </div>
</template>

<script>
import courseboardListHeader from '@/components/courseboardListHeader.vue' 
import courseboardListBody from '@/components/courseboardListBody.vue'
export default ({
  name:'courseboardListView',
  components:{
    courseboardListHeader,
    courseboardListBody
  }
})
</script>


<style>

</style>






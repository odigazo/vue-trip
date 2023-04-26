<template>
  <div class="courseboard">
    <courseboardHeader></courseboardHeader>
    <courseboardBody></courseboardBody>
  </div>
</template>

<script>
import courseboardHeader from '@/components/courseboardHeader.vue' 
import courseboardBody from '@/components/courseboardBody.vue'
export default ({
  name:'courseboardView',
  components:{
    courseboardHeader,
    courseboardBody
  }
})
</script>


<style>

</style>






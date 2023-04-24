<template>
  <div class="signup">
    <SignUpHeader></SignUpHeader>
    <SignUpBody></SignUpBody>
  </div>
</template>

<script>
import SignUpHeader from '@/components/SignUpHeader.vue' 
import SignUpBody from '@/components/SignUpBody.vue'
export default ({
  name:'SignUpView',
  components:{
    SignUpHeader,
    SignUpBody
  }
})
</script>


<style>

</style>






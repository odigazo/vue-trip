<template>
  <div class="login">
    <LoginHeader></LoginHeader>
    <LoginBody></LoginBody>
  </div>
</template>

<script>
import LoginHeader from '@/components/LoginHeader.vue' 
import LoginBody from '@/components/LoginBody.vue'
export default ({
  name:'LoginView',
  components:{
    LoginHeader,
    LoginBody
  }
})
</script>


<style>

</style>






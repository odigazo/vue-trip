<template>
  <div class="signupheader">
    <img class="logo" src="../assets/image/triplogo.png"/>
    <div class="middle">회원가입 페이지</div>
    <div class="signup"><a @click="login()">로그인</a></div>
  </div>
</template>

<script>

export default({
  methods:{
    login(){
      this.$router.push({name:"login"})
    }
  }
})
</script>


<style scoped>
  div.signupheader {
    display: flex;
    align-items: center;
    height: 80px;
    background-color: rgb(255, 255, 255);
  }

  div.middle {
    flex: 1;
    text-align: center;
    font-size: 24px; /* 글자 크기 */
    font-weight: bold; /* 글자 굵기 */
  }

  div.signup {
    text-align:right;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }

  .logo {
    width: 160px;
    border-radius: 50%;
    margin-left: 20px;
  }

</style>

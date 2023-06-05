<template>
  <div class="main text-center">
    
    <img class="logo" src="../assets/image/triplogo.png"/>
    
    <v-row justify="center" align="center" class="h-100">
     
      <v-card class="md-4 mx-lg-auto" max-width="600">
        <v-img
          class="white--text align-end"
          height="400px"
          src="https://image.news1.kr/system/photos/2020/5/18/4198953/article.jpg/dims/optimize"
        >
        </v-img>


        <v-card-text class="text--primary">
          <h3>국내 여행을 가고 싶으신가요?</h3>
          <h3>저희가 당신에게 맞는 여행지와 여행코스를 추천해드릴게요</h3>
          <h3>지금 로그인 해서 여행 계획을 세워보세요</h3>
        </v-card-text>
        <v-divider class="ma-3"></v-divider>
        <v-card-actions>
          <v-row justify="center">
            <v-btn class="ma-2" x-large color="primary" dark @click="login()"
              >로그인</v-btn
            >
          </v-row>
        </v-card-actions>
      </v-card>
      
    </v-row>
  </div>
</template>

<script>


export default {
  name: "MainView",

  methods: {
    login() {
      this.$router.push({ name: "login" });
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    
  },
};
</script>
<style>
.main {
  background-color: rgb(255, 255, 255);
}
.h-100 {
  height: 100%;
}
.logo {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

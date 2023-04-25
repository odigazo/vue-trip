<template>
  <div class="mainHeader">
    <img class="logo" src="../assets/image/triplogo.png"/>
    <div class="signup"><a @click="searchPlaces()">여행지 찾기</a></div>
    <div class="signup"><a @click="recommendPlaces()">여행지 추천</a></div>
    <div class="signup"><a @click="courseBoard()">코스바구니</a></div>
  </div>
</template>
<script>
export default {
    methods : {
        searchPlaces() {
            if (this.$router.currentRoute.name == 'tripMain') {
                return;
            }else {
                this.$router.push({name:"tripMain"});
            }
        },
        recommendPlaces(){
          // this.$router.push({name:})
        },
        courseBoard(){

        }
    }
}
</script>
<style scoped>
  div.mainHeader {
    display: flex;
    align-items: center;
    height: 80px;
    background-color: rgb(0, 166, 255);
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
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>
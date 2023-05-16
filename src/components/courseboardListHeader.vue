<template>
  <div class="mainHeader">
    <img class="logo" src="../assets/image/triplogo.png" />
    <div class="center">
      <div class="signup"><a @click="searchPlaces()">여행지 찾기</a></div>
      <div class="signup"><a @click="recommendPlaces()">여행지 추천</a></div>
      <div class="signup"><a @click="courseBoard()">코스바구니</a></div>
      <div class="search-container">
      <input
        id="search"
        type="text"
        placeholder="주소를 입력해주세요"
        v-model="keyword"
      />
      </div>
    </div>
    <div class="right">
      <div>{{ $store.getters.getUserInfo.userNickname }}</div>
      <div class="signup2"><a @click="logout()">로그아웃</a></div>
      <div class="signup2"><a @click="myPage()">마이페이지</a></div>
      <div>
        미방문한 코스가<a class="signup" @click="myPage(MyPageCourseBody)">0</a>개
        있습니다.
      </div>
    </div>
  </div>
</template>

<script>

// export default({
//   methods:{
//     signup(){
//       this.$router.push({name:"main"})
//     }
//   }
// })
</script>


<style scoped>
 div.mainHeader {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: rgb(0, 166, 255);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.center {
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
div.right {
  flex: 1;
  text-align: right;
  font-size: 14px;
}
div.middle {
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

div.signup, div.signup2, a.signup {
  text-align: right;
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: pointer;
  margin-right: 20px;
  transition: color 0.3s;
}
div.signup:hover, div.signup2:hover, a.signup:hover {
  color: rgb(200, 200, 200);
}

.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 20px;
}

.search-container {
  position: relative;
  margin-left: 20px;
}

input#search {
  font-size: 16px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input#search:focus {
  border-color: rgb(0, 166, 255);
}

</style>

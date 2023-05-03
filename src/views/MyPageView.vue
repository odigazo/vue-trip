<template>
  <div class="tripcourse">
    <MainHeader2></MainHeader2>
    <!-- <MyPageUpdateInfoBody></MyPageUpdateInfoBody> -->
    <!-- <nav>
      <button @click="loadComponent('MyPageUpdateInfoBody')">
        MyPageUpdateInfoBody
      </button>
      <button @click="loadComponent('MyPageCourseBody')">
        MyPageCourseBody
      </button>
      <button @click="loadComponent('MyPageCommentsBody')">
        MyPageCommentsBody
      </button>
      
    </nav> -->
    <h3>마이페이지</h3>
    <hr />
    <div class="container">
      <div class="left">
        <p>
          <a :class="{ 'bold-link': activeLink === 1 }" @click="loadComponent('MyPageUpdateInfoBody', 1)"
            >회원정보수정</a
          >
        </p>
        <p>
          <a :class="{ 'bold-link': activeLink === 2 }" @click="loadComponent('MyPageCourseBody', 2)"
            >내가 담은 코스</a
          >
        </p>
        <p>
          <a :class="{ 'bold-link': activeLink === 3 }" @click="loadComponent('MyPageCommentsBody', 3)"
            >내가 쓴 댓글</a
          >
        </p>
      </div>
      <div class="line"></div>
    </div>
    <component v-bind:is="currentComponent"></component>
  </div>
</template>

<script>
import MainHeader2 from "@/components/MainHeader2.vue";
// import MyPageUpdateInfoBody from "@/components/MyPageUpdateInfoBody.vue";
// import MyPageCommentsBody from "@/components/MyPageCommentsBody.vue";
// import MyPageCourseBody from "@/components/MyPageCourseBody.vue";
export default {
  name: "TripCourseView",
  components: {
    MainHeader2,
    // MyPageUpdateInfoBody,
    // MyPageCommentsBody,
    // MyPageCourseBody,
  },
  data() {
    return {
      currentComponent: this.$route.params.component,
      activeLink: null
    };
  },
  methods: {
    loadComponent(componentName, linkIndex) {
      this.activeLink = linkIndex;
      import(`@/components/${componentName}.vue`).then((component) => {
        // 가져온 컴포넌트를 설정합니다.
        this.currentComponent = component.default || component;
      });
    },
  },
};
</script>
<style>
.bold-link {
  font-weight: bold;
}
.container {
  width: 100%;
}
.left {
  float: left;
  width: 20%;
}
/* .myComments {
  float: right;
  width: 80%;
} */
.line {
  border-left: 1px solid rgb(0, 0, 0);
  height: 100%;
  position: absolute;
  left: 20%;
  margin-left: 3px;
  top: 23%;
}
</style>
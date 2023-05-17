<template>
  <div class="tripcourse">
    <MainHeader2></MainHeader2>
    <h3>마이페이지</h3>
    <hr />
    <v-container>
    <v-row justify="center">
      <v-col cols="3">
            <v-list>
              <v-list-item v-for="(link, index) in links" :key="index" link>
                <v-list-item-content>
                  <v-list-item-title :class="{ 'bold-link': activeLink === index + 1 }" @click="loadComponent(link.component, index + 1)">
                    {{ link.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="9">
        <component :is="currentComponent"></component>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import MainHeader2 from "@/components/MainHeader2.vue";
import MyPageUpdateInfoBody from "@/components/MyPageUpdateInfoBody.vue";
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
      // currentComponent: this.$route.params.component,
      // activeLink: null
      activeLink: 1,
      links: [
        {
          text: "회원정보수정",
          component: "MyPageUpdateInfoBody"
        },
        {
          text: "내가 담은 코스",
          component: "MyPageCourseBody"
        },
        {
          text: "내가 쓴 댓글",
          component: "MyPageCommentsBody"
        }
      ],
      currentComponent: MyPageUpdateInfoBody
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
    // loadComponent(componentName, linkIndex) {
    //   this.activeLink = linkIndex;
    //   this.currentComponent = componentName;
    // }
  },
  // created(){
  //   this.loadComponent(this.$route.params.component,this.$route.params.index);
  // }
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
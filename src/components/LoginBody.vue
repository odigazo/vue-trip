<template>
  <div class="loginbody">
    <h3>로그인</h3>
    <div>
      <v-row justify="center">
        <v-col cols="4">
          <v-text-field
            label="E-mail"
            v-model.lazy="email"
            hide-details="auto"
            class="my-text-field"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row justify="center">
        <v-col cols="4">
          <v-text-field
            label="Password"
            v-model.lazy="password"
            hide-details="auto"
            type="password"
            class="my-text-field"
            @keyup.enter="login()"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <br/>
    <v-btn small color="primary" dark @click="login()">로그인</v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    next(input) {
      document.getElementById(input).focus();
    },
    login() {
      axios
        .get(this._baseUrl + "login/", {
          params: {
            email: this.email,
            password: this.password,
          },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data.userInfo == null) {
            alert("로그인 실패 아이디와 비밀번호를 확인해주세요");
          } else {
            this.$store.commit("RESET_STATE");
            this.$store.commit("setUserInfo", JSON.parse(result.data.userInfo));
            console.log("로그인 성공");
            localStorage.clear("vuex");
            this.$router.push({ name: "tripMain" });
          }
        })
        .catch(function () {
          console.log("로그인 실패");
        });
    },
  },
};
</script>
<style scoped>
.loginbody {
  text-align: center;
}
.my-text-field {
  width: 250px;
  max-width: 400px;
}
</style>
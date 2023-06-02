<template>
  <div class="loginbody">
    <hr />
    <br/>
    <h1>로그인</h1>
    <br/>
    <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="4"
    >
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="email"
            v-model="email"
            :rules="[() => !!email || 'This field is required']"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            v-model="password"
            name="Password"
            label="Password"
            hint="At least 4 characters"
            class="input-group--focused"
            @click:append="show = !show"
            @keyup.enter="login()"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="login()"
          >
            로그인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      show:false,
      rules: {
          required: value => !!value || 'This field is required',
          min: v => v.length >= 4 || 'Min 4 characters',
        },
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
            axios
              .get(this._baseUrl + "courseBoard/myList", {
                params: {
                  userNum: this.$store.getters.getUserInfo.userNum,
                },
              })
              .then((result2) => {
                console.log(result2.data);
                this.$store.commit(
                  "setMyList",
                  JSON.parse(result2.data.boardlist)
                );
                this.$store.commit(
                  "setMyComments",
                  JSON.parse(result2.data.commentlist)
                );
                this.$store.commit("setCount",result2.data.count);
                console.log(result2.data.count);
                this.$router.push({ name: "tripMain" });
              })
              .catch(function (error) {
                console.error("에러 ", error);
              });
            
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
<template>
  <div class="signupbody text-center">
    <hr />
    <br>
    <h1>회원가입</h1>
    <br />
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="4">
        <v-card ref="form">
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  label="E-mail"
                  v-model.lazy="email"
                  hide-details="auto"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="checkEmail()"
                  >중복확인</v-btn
                >
              </v-col>
            </v-row>
            <div>{{ emailnotice }}</div>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  label="비밀번호"
                  v-model.lazy="password"
                  hide-details="auto"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  label="비밀번호 확인"
                  v-model.lazy="password_check"
                  hide-details="auto"
                  type="password"
                  @keyup="checkPW()"
                ></v-text-field>
              </v-col>
            </v-row>
            <div>{{ pwnotice }}</div>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  label="닉네임"
                  v-model.lazy="nickname"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="checkNickName()"
                  >중복확인</v-btn
                >
              </v-col>
            </v-row>
            <div>{{ nicknamenotice }}</div>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  label="도로명 주소"
                  v-model.lazy="address"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="execDaumPostcode()"
                  >주소 검색</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-text-field
                  label="나이"
                  v-model.lazy="age"
                  hide-details="auto"
                  type="number"
                  @keyup.enter="signup()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn text> Cancel </v-btn>
            <v-spacer></v-spacer>

            <v-btn color="primary"
            text @click="signup()"
              >가입하기</v-btn
            >
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
      password_check: "",
      nickname: "",
      postcode: "",
      address: "",
      age: 0,
      emailnotice: "",
      pwnotice: "",
      nicknamenotice: "",
    };
  },
  methods: {
    checkEmail() {
      axios
        .get(this._baseUrl + "signup/checkemail", {
          params: {
            email: this.email,
          },
        })
        .then((result) => {
          if (result.data) {
            this.emailnotice = "사용가능한 아이디 입니다.";
          } else {
            this.emailnotice = "중복된 아이디 입니다.";
          }
        })
        .catch(function () {
          console.log("아이디 확인 실패");
        });
    },
    checkPW() {
      if (this.password == this.password_check) {
        this.pwnotice = "비밀번호가 일치합니다.";
      } else {
        this.pwnotice = "비밀번호가 일치하지 않습니다.";
      }
    },
    checkNickName() {
      axios
        .get(this._baseUrl + "signup/checknickname", {
          params: {
            nickname: this.nickname,
          },
        })
        .then((result) => {
          if (result.data) {
            this.nicknamenotice = "사용가능한 닉네임 입니다.";
          } else {
            this.nicknamenotice = "중복된 닉네임 입니다.";
          }
        })
        .catch(function () {
          console.log("닉네임 확인 실패");
        });
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          // 우편번호를 입력한다.
          // this.postcode = data.zonecode;
        },
      }).open();
    },
    next(input) {
      document.getElementById(input).focus();
    },
    signup() {
      if (
        this.emailnotice === "사용가능한 아이디 입니다." &&
        this.pwnotice === "비밀번호가 일치합니다." &&
        this.nicknamenotice === "사용가능한 닉네임 입니다." &&
        this.address !== null &&
        this.age > 0
      ) {
        console.log("회원가입가능");
        axios
          .get(this._baseUrl + "signup/", {
            params: {
              email: this.email,
              password: this.password,
              nickname: this.nickname,
              address: this.address,
              age: this.age,
            },
          })
          .then((result) => {
            console.log(result.data);
            if (result.data.userInfo == null) {
              alert("회원가입 성공");
            } else {
              console.log("회원가입 실패");
            }
          })
          .catch(function () {
            console.log("회원가입 실패");
          });
      } else {
        console.log("다시 입력해주세요");
      }
    },
  },
};
</script>

<style>
.my-text-field {
  width: 300px;
  max-width: 400px;
}
</style>
<template>
  <div class="myPageUpdateInfo">
    <div class="container">
      <div class="infoupdate text-center">
        <div>
          <v-row>
            <v-col cols="2" class="d-flex align-self-center">
              <span class="email-label">E-mail : </span>
            </v-col>
            <v-col cols="6" class="d-flex align-self-center">
              <v-text-field
                :label="$store.getters.getUserInfo.userEmail"
                hide-details="auto"
                class="my-text-field"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <br />
        <div>
          <div>
            <v-row>
              <v-col cols="2" class="d-flex align-self-center">
                <span class="email-label">닉네임 : </span>
              </v-col>
              <v-col cols="6" class="d-flex align-self-center">
                <v-text-field
                  :label="$store.getters.getUserInfo.userNickname"
                  v-model.lazy="nickname"
                  hide-details="auto"
                  class="my-text-field"
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="d-flex align-self-center">
                <v-btn @click="checkNickName()">중복확인</v-btn>
              </v-col>
            </v-row>
          </div>
          <div>{{ nicknamenotice }}</div>
        </div>
        <br />
        <div>
          <div>
            <v-row>
              <v-col cols="2" class="d-flex align-self-center">
                <span class="email-label">주소 : </span>
              </v-col>
              <v-col cols="6" class="d-flex align-self-center">
                <v-text-field
                  :label="$store.getters.getUserInfo.userAddr"
                  v-model.lazy="address"
                  hide-details="auto"
                  class="my-text-field"
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="d-flex align-self-center">
                <v-btn @click="execDaumPostcode()">도로명주소 찾기</v-btn>
              </v-col>
            </v-row>
          </div>
        </div>
        <br />
        <div>
          <div>
            <v-row>
              <v-col cols="2" class="d-flex align-self-center">
                <span class="email-label">나이 : </span>
              </v-col>
              <v-col cols="6" class="d-flex align-self-center">
                <v-text-field
                  :label="$store.getters.getUserInfo.userAge.toString()"
                  v-model.lazy="age"
                  hide-details="auto"
                  class="my-text-field"
                  type="number"
                ></v-text-field>
              </v-col>
             
            </v-row>
          </div>
          
        </div>
        <br />
        <modal name="signoutModal">
          <div>
            <p>정말 회원탈퇴 하시겠습니까?</p>
            <v-btn @click="signout">예</v-btn>
            <v-btn @click="$modal.hide('signoutModal')">아니오</v-btn>
          </div>
        </modal>
        <v-btn @click="update">수정하기</v-btn>
        <v-btn @click="$modal.show('signoutModal')">회원탈퇴하기</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nickname: this.$store.getters.getUserInfo.userNickname,
      address: this.$store.getters.getUserInfo.userAddr,
      age: String(this.$store.getters.getUserInfo.userAge),
      nicknamenotice: "",
    };
  },
  methods: {
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
          //   this.postcode = data.zonecode;
        },
      }).open();
    },
    update() {
      console.log(typeof(this.age),"-------------");
      if (
        (this.nickname==this.$store.getters.getUserInfo.userNickname||this.nicknamenotice === "사용가능한 닉네임 입니다.") &&
        this.address !== null &&
        this.age > 0
      ) {
        console.log("정보수정가능");
        axios
          .put(this._baseUrl + "signup/infoupdate", {
            email: this.$store.getters.getUserInfo.userEmail,
            nickname: this.nickname,
            address: this.address,
            age: this.age,
          })
          .then((result) => {
            console.log(result.data);
            if (result.data.newInfo != null) {
              alert("정보수정 성공");
              this.$store.commit(
                "setUserInfo",
                JSON.parse(result.data.newInfo)
              );
            } else {
              console.log("정보수정 실패");
            }
          })
          .catch(function () {
            console.log("정보수정 실패");
          });
      } else {
        console.log("다시 입력해주세요");
      }
    },
    signout() {
      axios
        .delete(this._baseUrl + "signup/signout", {
          data: { email: this.$store.getters.getUserInfo.userEmail },
        })
        .then((result) => {
          console.log(result.data);
          if (result.data == 1) {
            alert("회원탈퇴 성공");
            this.$store.commit("RESET_STATE");
            this.$router.push({ name: "main" });
          } else {
            console.log("회원탈퇴 실패");
          }
        })
        .catch(function () {
          console.log("회원탈퇴 실패");
        });
    },
  },
};
</script>

<style>
.container {
  width: 100%;
}
.left {
  float: left;
  width: 20%;
}
.infoupdate {
  float: right;
  width: 80%;
}
.line {
  border-left: 1px solid rgb(0, 0, 0);
  height: 100%;
  position: absolute;
  left: 20%;
  margin-left: 3px;
  top: 23%;
}
.my-text-field {
  width: 200px;
  max-width: 400px;
  height: 80px;
}
.email-label {
  font-size: 16px;
}
</style>
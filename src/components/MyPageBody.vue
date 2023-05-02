<template>
  <div class="myPageUpdateInfo">
    <h3>마이페이지</h3>
    <hr />
    <div class="container">
      <div class="left">
        <p>회원정보수정</p>
        <p>내가 담은 코스</p>
        <p>내가 쓴 댓글</p>
      </div>
      <div class="line"></div>
      <div class="infoupdate">
        <div>
          <span>E-mail : {{ $store.getters.getUserInfo.userEmail }}</span>
        </div>
        <br />
        <div>
          <span>닉네임</span>
          <span>
            <input
              id="nickname"
              type="text"
              :placeholder="$store.getters.getUserInfo.userNickname"
              @keyup.enter="checkNickName()"
              v-model.lazy="nickname"
            />
            <button @click="checkNickName()">중복확인</button>
            <div>{{ nicknamenotice }}</div>
          </span>
        </div>
        <br />
        <div>
          <input
            type="text"
            v-model="address"
            :placeholder="$store.getters.getUserInfo.userAddr"
          /><input
            type="button"
            @click="execDaumPostcode()"
            value="도로명 주소 찾기"
          /><br />
        </div>
        <br />
        <div>
          <span>나이 : {{ $store.getters.getUserInfo.userAge }}</span>
          <span>
            <input id="age" type="number" v-model.lazy="age" />
          </span>
        </div>
        <br />
        <modal name="signoutModal">
          <div>
            <p>정말 회원탈퇴 하시겠습니까?</p>
            <button @click="signout">예</button>
            <button @click="$modal.hide('signoutModal')">아니오</button>
          </div>
        </modal>
        <button @click="update">수정하기</button>
        <button @click="$modal.show('signoutModal')">회원탈퇴하기</button>
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
      age: this.$store.getters.getUserInfo.userAge,
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
      if (
        this.nicknamenotice === "사용가능한 닉네임 입니다." &&
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
            data : {email: this.$store.getters.getUserInfo.userEmail,}
          })
          .then((result) => {
            console.log(result.data);
            if (result.data==1) {
              alert("회원탈퇴 성공");
              this.$store.commit("RESET_STATE");
              this.$router.push({name:"main"});
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
</style>
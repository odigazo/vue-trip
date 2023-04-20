<template>
    <div class="signupbody">
        <div>회원가입</div>
        <div>
            <span>E-mail</span>
            <div>
                <input id="email" type="email" @keyup.enter="next('password')" v-model.lazy="email">
            </div>
        </div>
        <div>
            <span>비밀번호</span>
            <div>
                <input id="password" type="password" @keyup.enter="next('password_check')" v-model.lazy="password">
            </div>
        </div>
        <div>
            <span>비밀번호 확인</span>
            <div>
                <input id="password_check" type="password" @keyup.enter="next('nickname')" v-model.lazy="password_check">
            </div>
        </div>
        <div>
            <span>닉네임</span>
            <div>
                <input id="nickname" type="text" @keyup.enter="next('password')" v-model.lazy="nickname">
            </div>
        </div>
        <div>
            <span>거주지</span>
            <div>
                <select v-model="selected">
                    <option v-for="(location, index) in locations" :value="index" :key="index">
                    {{ location }}
                    </option>
                </select>
            </div>
        </div>
        <div>
            <span>나이</span>
            <div>
                <input id="age" type="number" @keyup.enter="signup()" v-model.lazy="age">
            </div>
        </div>
        <button @click="signup()">가입하기</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            email:'',
            password:'',
            password_check:'',
            nickname:'',
            location:'',
            age:0,
            selected: 0,
            locations: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주']
        }
    },
    watch:{
        selected(value) {
            this.location = value;
        },
    },
    methods:{
        next(input){
            document.getElementById(input).focus()
        },
        signup(){
            axios.get(this._baseUrl+"signup/",{
                params:{
                    email : this.email,
                    password : this.password,
                    nickname : this.nickname,
                    location : this.location,
                    age : this.age,
                }
            }).then(result=>{
                console.log(result.data);
                if(result.data.userInfo==null){
                    alert("회원가입 실패");
                }else{
                    this.$store.commit("setUserInfo",JSON.parse(result.data.userInfo));
                    console.log("로그인 성공");
                }
            }).catch(function(){
                console.log("회원가입 실패");
            })
        }
    }
}
</script>

<style>

</style>
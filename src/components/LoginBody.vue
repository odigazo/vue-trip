<template>
    <div class="loginbody">
        <div class="login-title">로그인</div>
        <div class="input-group">
            <label for="email">E-mail</label>
            <input id="email" type="email" @keyup.enter="next('password')" v-model.lazy="email" class="input-field">
        </div>
        <div class="input-group">
            <label for="password">Password</label>
            <input id="password" type="password" @keyup.enter="login()" v-model.lazy="password" class="input-field">
        </div>
        <button class="login-btn" @click="login()">로그인</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        next(input){
            document.getElementById(input).focus()
        },
        login(){
            axios.get(this._baseUrl+"login/",{
                params:{
                    email : this.email,
                    password : this.password
                }
            }).then(result=>{
                console.log(result.data);
                if(result.data.userInfo==null){
                    alert("로그인 실패 아이디와 비밀번호를 확인해주세요");
                }else{
                    this.$store.commit("RESET_STATE");
                    this.$store.commit("setUserInfo",JSON.parse(result.data.userInfo));
                    console.log("로그인 성공");
                    localStorage.clear('vuex');
                    this.$router.push({name:"tripMain"})
                }
            }).catch(function(){
                console.log("로그인 실패");
            })
        }
    }
}
</script>

<style scoped>
.loginbody {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1rem;
}

label {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.input-field {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.login-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #2d7ff9;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #1a66d9;
}
</style>
<template>
    <div class="loginbody">
        <div>로그인</div>
        <div>
            <span>E-mail</span>
            <div>
                <input id="email" type="email" @keyup.enter="next('password')" v-model.lazy="email">
            </div>
        </div>
        <div>
            <span>Password</span>
            <div>
                <input id="password" type="password" @keyup.enter="login()" v-model.lazy="password">
            </div>
        </div>
        <button @click="login()">로그인</button>
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

<style>

</style>
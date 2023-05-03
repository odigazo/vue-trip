<template>
    <div class="signupbody">
        <div>회원가입</div>
        <div>
            <span>E-mail</span>
            <div>
                <input id="email" type="email" @keyup.enter="next('password')" v-model.lazy="email"><button @click="checkEmail()">중복확인</button>
                <div>{{emailnotice}}</div>
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
                <input id="password_check" type="password" @keyup.enter="next('nickname')" @keyup="checkPW()" v-model="password_check">
                <div>{{pwnotice}}</div>
            </div>
        </div>
        <div>
            <span>닉네임</span>
            <div>
                <input id="nickname" type="text" @keyup.enter="checkNickName()" v-model.lazy="nickname"><button @click="checkNickName()">중복확인</button>
                <div>{{nicknamenotice}}</div>
            </div>
        </div>
        <div>
            <!-- <input type="text" v-model="postcode" placeholder="우편번호"> -->
            <input type="button" @click="execDaumPostcode()" value="도로명 주소 찾기"><br>
            <input type="text" v-model="address" placeholder="도로명주소"><br>
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
            postcode:'',
            address:'',
            age:0,
            emailnotice:'',
            pwnotice:'',
            nicknamenotice:'',
        }
    },
    methods:{
        checkEmail(){
            axios.get(this._baseUrl+"signup/checkemail",{
                params:{
                    email : this.email,
                }
            }).then(result=>{
                if(result.data){
                    this.emailnotice='사용가능한 아이디 입니다.';
                }else{
                    this.emailnotice='중복된 아이디 입니다.';
                }
            }).catch(function(){
                console.log("아이디 확인 실패");
            })
        },
        checkPW(){
            if(this.password==this.password_check){
                this.pwnotice='비밀번호가 일치합니다.';
            }else{
                this.pwnotice='비밀번호가 일치하지 않습니다.'
            }
        },
        checkNickName(){
            axios.get(this._baseUrl+"signup/checknickname",{
                params:{
                    nickname : this.nickname,
                }
            }).then(result=>{
                if(result.data){
                    this.nicknamenotice='사용가능한 닉네임 입니다.';
                }else{
                    this.nicknamenotice='중복된 닉네임 입니다.';
                }
            }).catch(function(){
                console.log("닉네임 확인 실패");
            })
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
        next(input){
            document.getElementById(input).focus()
        },
        signup(){
            if(this.emailnotice==='사용가능한 아이디 입니다.'&&this.pwnotice==='비밀번호가 일치합니다.'
            &&this.nicknamenotice==='사용가능한 닉네임 입니다.'&&this.address!==null&&this.age>0){
                console.log('회원가입가능');
                axios.get(this._baseUrl+"signup/",{
                    params:{
                        email : this.email,
                        password : this.password,
                        nickname : this.nickname,
                        address : this.address,
                        age : this.age,
                    }
                }).then(result=>{
                    console.log(result.data);
                    if(result.data.userInfo==null){
                        alert('회원가입 성공');
                    }else{
                        console.log('회원가입 실패');
                    }
                }).catch(function(){
                    console.log('회원가입 실패');
                })
            }else{
                console.log('다시 입력해주세요');
            }
            
        }
    }
}
</script>

<style>

</style>
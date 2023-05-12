<template>
  <div class="main text-center">
    <img src="../assets/image/triplogo.png">
    <div><v-btn small color="primary" dark @click="login()">Login</v-btn></div>
    <div><v-btn small color="primary" dark @click="signup()">Sign Up</v-btn></div>
    <!-- <div>
      <div class="chat-window">
        <div v-for="(conversation, index) in chat" :key="index" :class="{'user': conversation.role === 'user', 'bot': conversation.role === 'bot'}">
          <span class="message">{{ conversation.message }}</span>
        </div>
      </div>
      <label for="prompt">Enter your prompt:</label>
      <input type="text" id="prompt" v-model="prompt" @keyup.enter="generateText"/>
      <button @click="generateText">Send</button>
    </div> -->
    <v-btn small color="primary" dark @click="tripMain">TripMain으로 이동</v-btn>
    <v-btn small color="primary" dark @click="gotoBoard">댓글로 이동</v-btn>
    <v-btn small color="primary" dark @click="gotocsBoard">courseboardList</v-btn>
  </div>
</template>

<script>
import axios from 'axios';

// const API_KEY = "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";
// const API_URL = "https://api.openai.com/v1/engines/text-davinci-003/completions";

export default {
  name: 'MainView',
  // data() {
  //   return {
  //     prompt: "",
  //     maxTokens: 1000,
  //     temperature: 0.5,
  //     completions: "",
  //     error: "",
  //     chat: [],
  //     lastQuestion: "",
  //     lastAnswer: "",
  //   };
  // },
  methods:{
    // async generateText() {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${API_KEY}`,
    //     },
    //     withCredentials: false
    //   };

    //   const body = {
    //     prompt: '너는 여행 스케쥴러야 '+this.lastQuestion + this.prompt,
    //     max_tokens: this.maxTokens,
    //     temperature: this.temperature,
    //   };

    //   try {
    //     const response = await axios.post(API_URL, body, config);
    //     const answer = response.data.choices[0].text;
    //     console.log(answer);
    //     this.chat.push({ role: "user", message: this.prompt });
    //     this.chat.push({ role: "bot", message: answer });
    //     this.lastQuestion = this.lastQuestion + this.prompt;
    //     this.lastAnswer = answer;
    //   } catch (error) {
    //     this.error = error.message;
    //   }
    //   this.prompt = "";
    // },
    login(){
      this.$router.push({name:"login"});
    },
    signup(){
      this.$router.push({name:"signup"});
    },
    tripMain() {
      this.$router.push({name:"tripMain"});

    },
    gotoBoard(){
      this.$store.commit("setIsEditing");
      this.$router.push({name:'courseboard'});
    },
    gotocsBoard(){
      console.log("....")
      axios
        .get(this._baseUrl + "courseBoard/courseList", {
          params: {
          },
        })
        .then(result=> {
          console.log(result.data);
          this.$store.commit("setCourseList",result.data);
          // this.$store.commit("setCourseList", result.data);
          this.$router.push({name:'courseboardList'});
        })
        .catch(function (error) {
          console.error("에러 ", error);
        });
      
    }

  }
}
</script>
<style>

</style>

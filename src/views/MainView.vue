<template>
  <div class="main">
    <img src="../assets/image/모행여행로고.png">
    <div><button @click="login()">Login</button></div>
    <div><button @click="signup()">Sign Up</button></div>
    <div>
      <div class="chat-window">
        <div v-for="(conversation, index) in chat" :key="index" :class="{'user': conversation.role === 'user', 'bot': conversation.role === 'bot'}">
          <span class="message">{{ conversation.message }}</span>
        </div>
      </div>
      <label for="prompt">Enter your prompt:</label>
      <input type="text" id="prompt" v-model="prompt" />
      <button @click="generateText">Send</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/engines/text-davinci-003/completions";

export default {
  name: 'MainView',
  data() {
    return {
      prompt: "어떤 코스를 추천받고 싶으신가요?",
      maxTokens: 500,
      temperature: 0.5,
      completions: "",
      error: "",
      chat: [],
      lastQuestion: "",
      lastAnswer: "",
    };
  },
  methods:{
    async generateText() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      const body = {
        prompt: this.lastQuestion + this.prompt,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      };

      try {
        const response = await axios.post(API_URL, body, config);
        const answer = response.data.choices[0].text;
        this.chat.push({ role: "user", message: this.prompt });
        this.chat.push({ role: "bot", message: answer });
        this.lastQuestion = this.lastQuestion + this.prompt;
        this.lastAnswer = answer;
      } catch (error) {
        this.error = error.message;
      }
      this.prompt = "";
    },
    login(){

    },
    signup(){

    }
  }
}
</script>
<style>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow-y: scroll;
}

.chat-window .user {
  align-self: flex-end;
  background-color: #ccc;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
}

.chat-window .bot {
  align-self: flex-start;
  background-color: #eee;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
}
</style>
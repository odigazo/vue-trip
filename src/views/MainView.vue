<template>
  <div class="main">
    <img src="../assets/image/모행여행로고.png">
    <div><button @click="login()">Login</button></div>
    <div><button @click="signup()">Sign Up</button></div>
    <div>
    <label for="prompt">Enter your prompt:</label>
    <input type="text" id="prompt" v-model="prompt" />
    <button @click="generateText">Generate Text</button>
    <p>{{ completions }}</p>
    </div>
  </div>
</template>
gi
<script>
import axios from 'axios';

const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/engines/text-davinci-003/completions";

export default {
  name: 'MainView',
  data() {
    return {
      prompt: "어떤 코스를 추천받고 싶으신가요?",
      maxTokens: 1000,
      temperature: 0.5,
      completions: "",
      error: "",
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
        prompt: this.prompt,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      };

      try {
        const response = await axios.post(API_URL, body, config);
        this.completions = response.data.choices[0].text;
      } catch (error) {
        this.error = error.message;
      }
    },
    login(){

    },
    signup(){

    }
  }
  
}
</script>

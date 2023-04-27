<template>
<div>
  <h2>코스 목록</h2>
    <ul class="board-list">
  
        <div class="board-info">
          <span>{{  }}</span>
          <span>{{  }}</span>
        </div>     
    </ul>
</div>
</template> 

<script>
import axios from "axios";

export default {
  data() {
    return {
    
      
    };
  },
  methods: {
    next(input) {
      document.getElementById(input).focus();
    },
    //댓글리스트
    commentList() {
      axios
        .get(this._baseUrl + "courseBoard/courseList", {
          params: {
            //글 목록 줄거
            // courseNum,
            // placeName,
            // courseTitle,
            // courseContents,
            // courseLike,

          },
        })
        .then((result) => {
          console.log(result.data);
          
           // this.$store.commit("setComments", JSON.parse(result.data));
            // this.$router.push({name:'main'}); 페이지 이동
            console.log("글목록 성공성공");
          
        });
    },

  }
};
</script>

<style scoped>

</style>
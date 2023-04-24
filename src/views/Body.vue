<template>
  <div>
    <h1>댓글 목록</h1>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.content }}
        <button @click="editComment(comment)">수정</button>
        <button @click="deleteComment(comment)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.loadComments();
  },
  methods: {
    loadComments() {
      axios.get('/api/comments')
        .then(response => {
          this.comments = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editComment(comment) {
      // 1. comment.id를 이용하여 라우터를 통해 수정할 댓글 정보
  axios.get(`/api/comments/${comment.id}`)
    .then(response => {
      const editedComment = response.data;
      // 2. 받아온 댓글 정보를 이용하여 화면에 수정 폼을 렌더링
      const newContent = prompt('댓글을 수정하세요', editedComment.content);
      // 사용자가 취소를 누른 경우
      if (!newContent) {
        return;
      }
      // 3. 사용자가 수정 폼에서 수정을 완료하면, 수정된 댓글 정보를 서버에 전송하여 데이터를 업데이트
      axios.put(`/api/comments/${comment.id}`, { content: newContent })
        .then(response => {
          const updatedComment = response.data;
          // 4. 데이터 업데이트가 완료되면, 수정된 댓글 정보를 다시 렌더링하여 화면에 반영
          const index = this.comments.findIndex(c => c.id === updatedComment.id);
          if (index >= 0) {
            this.comments.splice(index, 1, updatedComment);
          }
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
    },
    deleteComment(comment) {
      
  // 1. 사용자로부터 삭제를 확인받습니다.
  if (!confirm("댓글을 삭제하시겠습니까?")) {
    return;
  }
  
  // 2. 서버에 DELETE 요청을 보내서 댓글을 삭제합니다.
  axios.delete(`/api/comments/${comment.id}`)
    .then(response => {
      // 3. 삭제가 완료되면 댓글 목록에서 삭제한 댓글을 제거합니다.
      const index = this.comments.findIndex(c => c.id === comment.id);
      if (index >= 0) {
        this.comments.splice(index, 1);
      }
    })
    .catch(error => {
      console.error(error);
    }); 
    },
  },
};
</script>
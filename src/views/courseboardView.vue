<template>
  <div class="courseboard">
    <MainHeader></MainHeader>
    <courseboardBody></courseboardBody>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader.vue'; 
import courseboardBody from '@/components/courseboardBody.vue'

export default {
  name:'courseboardView',
  components:{
    MainHeader,
    courseboardBody
  }
}
</script>

<style>
.courseboard {
  /* max-width: 800px; */
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

/* 헤더 스타일 */
.courseboardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.courseboardHeader .btn {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
}

.courseboardHeader .btn:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

/* 본문 스타일 */
.courseboardBody {
  display: flex;
  flex-direction: column;
}

.courseboardBody .course {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.courseboardBody .course .thumbnail {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.courseboardBody .course .title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.courseboardBody .course .description {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.courseboardBody .course .btn {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
}

.courseboardBody .course .btn:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.courseboardBody .course:last-child {
  margin-bottom: 0;
}
</style>
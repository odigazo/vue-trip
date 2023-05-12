<template>
  <div class="myPageCourse">
    <v-data-table
      :headers="headers"
      :items="$store.getters.getMyList"
      class="elevation-1"
    >
      <template v-slot:[`item.courseTitle`]="{ item }">
      <v-btn
      text
      color="primary"
    >
      {{ item.courseTitle }}
    </v-btn>
    </template>
    </v-data-table>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
        headers: [
          {
            text: '추천날짜',
            align: 'start',
            sortable: false,
            value: 'createDate',
          },
          { text: '제목', value: 'courseTitle' },
          { text: '방문여부', value: 'travelStatus' },
          
        ],
    };
  },
  methods: {},
};
</script>

<style>
.container {
  width: 100%;
}
.left {
  float: left;
  width: 20%;
}
.myCourse {
  float: right;
  width: 80%;
}
.line {
  border-left: 1px solid rgb(0, 0, 0);
  height: 100%;
  position: absolute;
  left: 20%;
  margin-left: 3px;
  top: 23%;
}
</style>
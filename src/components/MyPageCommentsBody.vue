<template>
  <div class="myPageComments">
    <v-data-table
      :headers="headers"
      :items="$store.getters.getComments"
      class="elevation-1"
    >
      <!-- <template v-slot:[`item.glutenfree`]="{ item }">
        <v-simple-checkbox
          v-model="item.glutenfree"
        ></v-simple-checkbox>
      </template> -->
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
            text: '코스번호',
            align: 'start',
            sortable: false,
            value: 'courseNum',
          },
          { text: '내용', value: 'contents' },
          { text: '작성날짜', value: 'contentsDate' },
          
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
.myComments {
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
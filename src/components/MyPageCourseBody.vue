<template>
  <div class="myPageCourse">
    <v-data-table
      :headers="headers"
      :items="$store.getters.getMyList"
      class="elevation-1"
    >
      <template v-slot:[`item.courseTitle`]="{ item }">
        <v-btn text color="primary" @click="openContent(item)">
          {{ item.courseTitle }}
        </v-btn>
      </template>
      <template v-slot:[`item.travelStatus`]="{ item }">
        <v-btn
          text
          :color="item.travelStatus === 'N' ? 'red' : 'green'"
          :disabled="item.travelStatus !== 'N'"
          @click="openModal(item)"
        >
          {{ item.travelStatus }}
        </v-btn>
      </template>
    </v-data-table>
    <!-- 모달 -->
    <v-dialog v-model="modalOpen" max-width="600px">
      <v-card>
        <v-card-title class="headline">방문 여부 확인</v-card-title>
        <v-card-text class="text-center">
          추천드린 코스는 즐거우셨나요?<br />
          확인 버튼을 누르시면 방문 상태가 변경됩니다.<br />
          만약 아직 코스를 방문하지 않았다면 취소를 눌러주세요.
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            x-large
            color="primary"
            @click="confirmTravelStatus"
            class="mr-4"
            >변경</v-btn
          >
          <v-btn x-large color="error" @click="cancelModal">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showContent" max-width="600px">
      <v-card>
        <v-card-title class="headline">여행 코스</v-card-title>
        <v-card-text class="text-center">
          <v-timeline>
            <v-timeline-item
              v-for="(values, key) in $store.getters.getCourseMap"
              :key="key"
              color="blue"
              small
            >
              <!-- <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold blue--text`"
              v-text="key"
            ></span>
          </template> -->
              <v-card>
                <v-card-title class="blue lighten-2">
                  <h2
                    class="text-h4 white--text font-weight-light"
                    v-text="key"
                  ></h2>
                </v-card-title>
                <v-card-text>
                  <ul class="items">
                    <li v-for="(answer, i) in values" :key="i">
                      {{ answer }}
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn x-large color="error" @click="cancelModal">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "추천받은 날짜",
          align: "start",
          sortable: false,
          value: "createDate",
        },
        { text: "코스 제목", value: "courseTitle" },
        { text: "방문여부", value: "travelStatus" },
      ],
      modalOpen: false,
      showContent: false,
      selectedItem: null,
    };
  },
  methods: {
    openModal(item) {
      this.selectedItem = item;
      this.modalOpen = true;
    },
    openContent(item) {
      this.selectedItem = item;
      this.showContent = true;
      axios
        .get(this._baseUrl + "course/schedule", {
          params: {
            answer: this.selectedItem.courseContents,
          },
        })
        .then((result) => {
          console.log(result);
          this.$store.commit("setSchedule", result.data);
          this.$store.commit("setCourseMap", result.data.tripmap);
          // this.$store.commit("setIsLoading", false);
        })
        .catch(function () {
          console.log("fail");
        });
    },
    confirmTravelStatus() {
      console.log(this.selectedItem.courseNum);
      axios
        .put(this._baseUrl + "courseBoard/updateCourse", {
          courseNum: this.selectedItem.courseNum,
        })
        .then((result) => {
          if (result.data == 1) {
            console.log("상태 변경 성공");
            axios
              .get(this._baseUrl + "courseBoard/myList", {
                params: {
                  userNum: this.$store.getters.getUserInfo.userNum,
                },
              })
              .then((result2) => {
                console.log(result2.data);
                this.$store.commit(
                  "setMyList",
                  JSON.parse(result2.data.boardlist)
                );
                this.$store.commit(
                  "setMyComments",
                  JSON.parse(result2.data.commentlist)
                );
                this.$store.commit("setCount", result2.data.count);
              })
              .catch(function (error) {
                console.error("에러 ", error);
              });
          }
        })
        .catch(function () {
          console.log("fail");
        });
      // Close the modal
      this.modalOpen = false;
    },
    cancelModal() {
      // Close the modal without changing the travelStatus
      this.modalOpen = false;
      this.showContent = false;
    },
  },
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
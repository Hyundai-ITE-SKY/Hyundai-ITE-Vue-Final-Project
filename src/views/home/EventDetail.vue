<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div style="background-color: black">
    <v-card shaped style="color: white; background-color: #1a1a1a" dark>
      <v-img height="100%" v-bind:src="`${event.eimage}`" :aspect-ratio="78 / 100"></v-img>
    </v-card>
    <v-card shaped style="color: white; background-color: #1a1a1a" dark>
      <v-card-title>{{ event.ename }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            기간 : {{ new Date(event.estartdate).toLocaleDateString() }} -
            {{ new Date(event.eenddate).toLocaleDateString() }}
          </v-col>
          <v-col cols="12" class="py-0">
            {{ event.edetail }}
          </v-col>
          <v-col cols="12" class="mt-2 text-center">
            <v-btn color="white" style="color: black" width="100%" @click="createCoupon"
              >쿠폰 발급</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card outlined class="pa-4" dark color="black">
      NOTICE
      <v-card-text>
        ✔ 쿠폰은 ID당 1회 발급되며, 유효기간이 만료되면<br />
        &ensp;&ensp;재발급 되지 않습니다.<br />
        ✔ 본 이벤트는 더한섬닷컴 회원을 대상으로 진행됩니다.<br />
        ✔ 구매 취소 시 잔여 결제금액이 조건 금액 미만인 경우 &ensp;&ensp;혜택이 취소됩니다.<br />
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="snackbarLogin">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="toLogin"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import apiEvent from "@/apis/event";
import apiMember from "@/apis/member";

export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      event: [],
      snackbar: false,
      snackbarText: "",
      snackbarLogin: false,
    };
  },
  //컴포넌트 메서드터 정의
  methods: {
    async getEventDetail() {
      let eid = this.$route.query.eid;
      await apiEvent
        .getEvent(eid)
        .then((response) => {
          this.event = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createCoupon() {
      //로그인 되어있지 않을 경우
      if (this.$store.getters["login/getUserId"] === "") {
        this.snackbarText = "로그인이 필요합니다.";
        this.snackbarLogin = true;
        return;
      }

      await apiMember
        .createCoupon(this.event.eid, this.event.ename, "할인 쿠폰")
        .then((response) => {
          if (response.data === 1) {
            //2. 쿠폰 발급 성공
            this.snackbarText = "쿠폰 발급 성공";
            this.snackbar = true;
          } else if (response.data === 2) {
            //2. 두번째 발급인 경우
            this.snackbarText = "이미 쿠폰을 발급받으셨습니다.";
            this.snackbar = true;
          } else if (response.data === 0) {
            //1. 인원 초과로 쿠폰 발급 실패
            this.snackbarText = "제한 인원을 초과하였습니다.";
            this.snackbar = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
  created() {
    this.getEventDetail();
    this.$store.commit("gnb/setCurrentPage", "eventdetail");
  },
  props: ["eno"],
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div>
    <v-card shaped style="margin-top: -10px; color: #252525; background-color: #f7f6f3">
      <v-img height="100%" v-bind:src="`${event.eimage}`"></v-img>

      <v-card-title>{{ event.ename }}</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" class="font-weight-black">
            기간 : {{ new Date(event.estartdate).toLocaleDateString() }} -
            {{ new Date(event.eenddate).toLocaleDateString() }}
          </v-col>

          <v-col cols="12" class="py-0">
            {{ event.edetail }}
          </v-col>
          <v-col cols="12" class="mt-2">
            <v-btn dark width="100%" @click="createCoupon">쿠폰 발급</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card outlined class="blue-grey lighten-5 pa-4">
      NOTICE
      <v-card-text>
        ✔ 쿠폰은 ID당 1회 발급되며, 유효기간이 만료되면<br />
        &ensp;&ensp;재발급 되지 않습니다.<br />
        ✔ 본 이벤트는 더한섬닷컴 회원을 대상으로 진행됩니다.<br />
        ✔ 구매 취소 시 잔여 결제금액이 조건 금액 미만인 경우 &ensp;&ensp;혜택이 취소됩니다.<br />
      </v-card-text>
    </v-card>
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createCoupon() {
      //로그인 되어있지 않을 경우 로그인 페이지로 이동

      await apiMember.createCoupon(this.event.eid, this.event.ename, "쿠폰 이름")
        .then((response)=>{
          console.log(response.data);
          //쿠폰 발급 성공했을 경우 (response.data===0)

          //인원 초과인 경우 (response.data===1)

        }).catch((error)=>{          
          console.log(error);
        });
    }
  },
  created() {
    this.getEventDetail();
  },
  props: ["eno"],
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

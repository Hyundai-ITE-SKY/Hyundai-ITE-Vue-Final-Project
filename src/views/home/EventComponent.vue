<!-- 컴포넌트 UI 정의 -->
<template>
  <div style="background-color: black">
    <v-card shaped>
      <!--<v-system-bar lights-out></v-system-bar>-->
      <v-carousel cycle :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus">
        <v-carousel-item v-for="(event, index) in events" :key="index">
          <div>
            <event-banner :imgUrl="event.eimage" :eid="event.eid"></event-banner>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card>
    <div
      class="pa-3 align-center"
      style="display: flex; height: 49px; border-bottom: solid 2px #333333"
    >
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span style="color: #f35516">프론트로우 X 아우어베이커리 TEASER</span> 기대평 이벤트
      </div>
      <v-icon class="ml-auto" color="white">mdi-chevron-right</v-icon>
    </div>
    <div class="pa-3 align-center" style="display: flex; height: 49px; border-bottom: solid 2px #333333">
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span style="color: yellow">야구 좋아하면 필수!</span> 폴로 & 엠엘비 발매
      </div>
      <v-icon class="ml-auto" color="white">mdi-chevron-right</v-icon>
    </div>
    <div class="pa-3 align-center" style="display: flex; height: 49px; border-bottom: solid 2px #333333">
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span>예일 크리스마스 홈웨어 컬렉션 한정 발매</span> 최대 26% 할인
      </div>
      <v-icon class="ml-auto" color="white">mdi-chevron-right</v-icon>
    </div>
    <div class="pa-3 align-center" style="display: flex; height: 49px; border-bottom: solid 2px #333333">
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span style="color: yellow">아메리칸 캐주얼 패밀리 위크</span> 단독 최대 71% 할인
      </div>
      <v-icon class="ml-auto" color="white">mdi-chevron-right</v-icon>
    </div>
    <div class="pa-3 align-center" style="display: flex; height: 49px">
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span style="color: yellow">니트부터 스웨트까지 최대 60% 할인</span> #스톤아일랜드 #겐조
      </div>
      <v-icon class="ml-auto" color="white">mdi-chevron-right</v-icon>
    </div>
  </div>
</template>

<script>
import EventBanner from "./EventBanner.vue";
import apiEvent from "@/apis/event";

export default {
  name: "EventComponent",
  components: { EventBanner },
  // 컴포넌트 데이터 정의
  data: function () {
    return {
      events: [
        {
          eamount: 10,
          edetail: "",
          eenddate: "",
          eid: 1,
          eimage: "",
          elimit: 10,
          ename: "",
          eorder: 0,
          estartdate: "",
        },
      ],
    };
  },
  // 컴포넌트 메소드 정의
  methods: {
    async getEvents() {
      await apiEvent
        .getEvents()
        .then((res) => {
          this.events = [];
          for (let event of res.data) {
            this.events.push(event);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getEvents();
  },
};
</script>

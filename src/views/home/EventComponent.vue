<!-- 컴포넌트 UI 정의 -->
<template>
  <div style="background-color: black">
    <v-card shaped>
      <!--<v-system-bar lights-out></v-system-bar>-->
      <v-carousel cycle :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus">
        <v-carousel-item  v-for="event in events" :key="event.eid">
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
    <div class="pa-3 align-center" style="display: flex; height: 49px">
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span style="color: yellow">야구 좋아하면 필수!</span> 폴로 & 엠엘비 발매
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
          eamount: 9,
          edetail: "MATIN KIM BLACK FRIDAY SALE! 최대 60% 할인 쿠폰 발급",
          eenddate: "2021-11-26T15:00:00.000+00:00",
          eid: 1,
          eimage:
            "https://user-images.githubusercontent.com/55488114/143763321-b8823939-2506-4eb3-a9fa-05e42ee57f58.jpg",
          elimit: 10,
          ename: "MATIN KIM BLACK FRIDAY",
          eorder: 0,
          estartdate: "2021-11-23T15:00:00.000+00:00",
        },
      ],
    };
  },
  // 컴포넌트 메소드 정의
  methods: {
    async getEvents() {
      await apiEvent.getEvents().then((res) => {
          console.log(res.data);
          this.events = [];
          
          console.log("event" + this.events);
          for(let event of res.data){
            this.events.push(event);
            console.log(event);
            console.log(event.eid);
            console.log(event.eimage);
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

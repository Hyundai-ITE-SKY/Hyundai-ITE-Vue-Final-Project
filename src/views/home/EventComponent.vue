<!-- 컴포넌트 UI 정의 -->
<template>
  <div style="background-color: black">
    <v-card shaped>
      <!--<v-system-bar lights-out></v-system-bar>-->
      <v-carousel cycle :show-arrows="false" hide-delimiter-background delimiter-icon="mdi-minus">
        <v-carousel-item>
          <div>
            <event-banner imgUrl="event1.jpg" :eid="1"></event-banner>
          </div>
        </v-carousel-item>
        <v-carousel-item>
          <div>
            <event-banner imgUrl="event2.png" :eid="2"></event-banner>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card>
    <div class="pa-3 align-center" style="display: flex; height: 49px; border-bottom: solid 2px #333333">
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span style="color: #F35516">프론트로우 X 아우어베이커리 TEASER</span> 기대평 이벤트
      </div>
      <v-icon class="ml-auto" color="white">mdi-chevron-right</v-icon>
    </div>
    <div class="pa-3 align-center" style="display: flex; height: 49px;">
      <div style="color: white; font-size: 0.875rem; font-weight: bolder">
        <span style="color: yellow">야구 좋아하면 필수!</span> 폴로 & 엠엘비 발매
      </div>
      <v-icon class="ml-auto" color="white">mdi-chevron-right</v-icon>
    </div>
  </div>
</template>

<script>
import EventBanner from "./EventBanner.vue";

export default {
  name: "EventComponent",
  components: { EventBanner },
  // 컴포넌트 데이터 정의
  data: function () {
    return {
    };
  },
  // 컴포넌트 메소드 정의
  methods: {},
};
</script>

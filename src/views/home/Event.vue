<!-- 컴포넌트 UI 정의 -->
<template>
    <v-card shaped outlined class="mb-5" style="margin-top: -6px">
      <!--<v-system-bar lights-out></v-system-bar>-->
      <v-carousel
        cycle
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
      >
        <v-carousel-item height="100%">
          <v-sheet height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div>
                <event-banner 
                  imgUrl="event1.jpg" 
                  :eid="1"></event-banner>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div>
                <event-banner 
                  imgUrl="event2.png"
                  :eid="2"></event-banner>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card>
</template>

<script>
import EventBanner from "./EventBanner.vue";
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "Event",
  // 추가하고 싶은 컴포넌트를 등록
  components: { EventBanner },
  // 컴포넌트 데이터 정의
  data: function () {
    return {
      colors: ["green", "secondary", "yellow darken-4", "red lighten-2", "orange darken-1"],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  // 컴포넌트 메소드 정의
  methods: {},
  created() {
    this.$store.commit("setOnTabs", true);
    this.$store.commit("setOnProduct", 0);
  },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

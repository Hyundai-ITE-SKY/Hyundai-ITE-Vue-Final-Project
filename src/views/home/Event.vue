<!-- 컴포넌트 UI 정의 -->
<template>
  <div>
    <event-banner></event-banner>
    <event-banner></event-banner>
    <event-banner></event-banner>
  </div>
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
    return {};
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

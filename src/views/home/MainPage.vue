<!-- 컴포넌트 UI 정의 -->
<template>
  <div>
    <div v-show="getMainPage() === 'EVENT'">
      <event-banner></event-banner>
      <event-banner></event-banner>
      <event-banner></event-banner>
    </div>
    <div v-show="getMainPage() === 'BEST'">
      <best-product></best-product>
    </div>
    <div v-show="getMainPage() === 'NEW'">
      <new-product></new-product>
    </div>
  </div>
</template>

<script>
import BestProduct from "./BestProduct.vue";
import EventBanner from "./EventBanner.vue";
import NewProduct from "./NewProduct.vue";
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "",
  // 추가하고 싶은 컴포넌트를 등록
  components: { EventBanner, BestProduct, NewProduct },
  // 컴포넌트 데이터 정의
  data: function () {
    return { page: "NEW" };
  },
  // 컴포넌트 메소드 정의
  methods: {
    getMainPage() {
      return this.$store.getters["gnb/getMainPage"];
    },
  },
  props: {},
  created() {
    this.$store.commit("gnb/setCurrentPage", "main");
  },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

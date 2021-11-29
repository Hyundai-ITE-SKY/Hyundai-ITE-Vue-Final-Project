<!-- 컴포넌트 UI 정의 -->
<template>
  <div>
    <v-img
      lazy-src="@/assets/images/event/eventloader.jpg"
      v-bind:src="require(`@/assets/images/event/${imgUrl}`)"
      @click="eventClick(`${eid}`)"
      :aspect-ratio="78 / 100"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script>
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "EventBanner",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return {};
  },
  // 컴포넌트 메소드 정의
  methods: {
    eventClick(eid) {
      this.$router.push(`/event/eventdetail?eid=${eid}`);
    },
  },
  props: {
    imgUrl: String,
    eid: Number,
  },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

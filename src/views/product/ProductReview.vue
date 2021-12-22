<!-- 컴포넌트 UI 정의 -->
<template>
  <div style="font-size: 0.7rem" class="mb-6">
    <div class="d-flex align-center">
      <div style="font-weight: bolder">{{ review.mname }}</div>
      <div class="ml-2">{{ review.rdate.substr(0, 10) }}</div>
      <div class="ml-auto">
        <v-rating
          background-color="orange lighten-3"
          color="orange"
          :value="review.rrate"
          class="pa-0"
          dense
          :size="20"
          readonly
        ></v-rating>
      </div>
    </div>
    <div class="mb-2" style="color: #386bfc">
      {{ review.pname }}, {{ review.pcolor }}, {{ review.psize }}
    </div>
    <div class="mb-2">
      <div class="d-flex">
        <div style="font-weight: bolder; width: 40px">가성비</div>
        <div>{{ rprice[review.rprice] }}</div>
      </div>
      <div class="d-flex">
        <div style="font-weight: bolder; width: 40px">착용감</div>
        <div>{{ rcomfortable[review.rcomfortable] }}</div>
      </div>
    </div>
    <div style="background-color: #eeeeee" class="mt-1 pa-3">
      <div class="mb-1" style="font-weight: bolder">{{ review.rtitle }}</div>
      <div>
        {{ review.rcontent }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return {
      rprice: ["만족해요", "적당해요", "비싸요"],
      rcomfortable: ["편안해요", "적당해요", "불편해요"],
    };
  },
  // 컴포넌트 메소드 정의
  methods: {},
  props: { review: Object },
  created() {},
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

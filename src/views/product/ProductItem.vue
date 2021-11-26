<!-- 컴포넌트 UI 정의 -->
<template>
  <v-sheet color="white" elevation="0">
    <div v-for="(color, i) in colors" :key="color.ccolorcode">
      <v-img
        v-show="colorIndex === i"
        :src="colors[i].cimage1"
        lazy-src="@/assets/images/event/eventloader.jpg"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
    <div style="display: flex" class="justify-center align-center">
      <div v-for="(color, i) in colors" :key="color.ccolorcode" class="ml-1 mr-1 mt-2 mb-2">
        <v-img :src="color.ccolorimage" width="18px" height="18px" @click="colorIndex = i"></v-img>
      </div>
    </div>
    <div class="pa-2">
      <div class="align-center" style="display: flex">
        <div>
          <div class="mt-1 text-truncate" style="font-size: 0.875rem; font-weight: bolder">
            {{ bname }}
          </div>
        </div>
        <div class="ml-auto" @click="state = !state">
          <v-icon v-if="!state">mdi-heart-outline</v-icon>
          <v-icon v-if="state" style="color: red">mdi-heart</v-icon>
        </div>
      </div>
      <div class="mb-1 text-truncate" style="font-size: 0.875rem; color: #333333">{{ pname }}</div>
      <div class="align-center" style="display: flex">
        <div class="text-truncate" style="font-size: 1rem; font-weight: bolder">
          {{ ((pprice * (100 - sales)) / 100).toLocaleString() }}원
        </div>
        <div
          class="text-decoration-line-through ml-auto text--disabled text-truncate"
          style="font-size: 0.875rem; font-weight: bolder"
        >
          {{ pprice.toLocaleString() }}원
        </div>
        <div class="ml-auto" style="font-size: 1.1rem; font-weight: bolder; color: #eb7c4c">
          {{ sales }}%
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return { state: false, colorIndex: 0, sales: 15 };
  },
  // 컴포넌트 메소드 정의
  methods: {},
  props: { bname: String, pname: String, pprice: Number, colors: Array },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

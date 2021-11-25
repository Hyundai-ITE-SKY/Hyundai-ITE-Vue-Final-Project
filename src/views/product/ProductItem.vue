<!-- 컴포넌트 UI 정의 -->
<template>
  <v-sheet color="white" elevation="0">
    <v-img :src="colors[0].cimage1"></v-img>
    <div style="display: flex" class="justify-center align-center">
      <div v-for="color in colors" :key="color.ccolorcode" class="ml-1 mr-1 mt-2 mb-2">
        <v-img :src="color.ccolorimage" width="18px" height="18px"></v-img>
      </div>
    </div>
    <div class="pa-2">
      <div class="align-center" style="display: flex">
        <div>
          <div class="mt-1 text-truncate" style="font-size: 0.875rem; font-weight: bolder">
            {{ bname }}
          </div>
        </div>
        <div class="ml-auto">
          <v-icon>mdi-heart-outline</v-icon>
          <v-icon style="color: red">mdi-heart</v-icon>
        </div>
      </div>
      <div class="mb-1 text-truncate" style="font-size: 0.875rem; color: #333333">{{ pname }}</div>
      <div style="font-size: 1rem; font-weight: bolder">{{ pprice }}</div>
    </div></v-sheet
  >
</template>

<script>
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return {};
  },
  // 컴포넌트 메소드 정의
  methods: {},
  props: ["bname", "pname", "pprice", "colors"],
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

<!-- 컴포넌트 UI 정의 -->
<template>
  <div style="background-color: white">
    <div
      class="pa-3 align-center"
      style="
        display: flex;
        background-color: #fafafa;
        border-top: solid 2px #ededed;
        border-bottom: solid 2px #ededed;
      "
    >
      <div style="font-weight: bolder; font-size: 0.875rem">2021.11.11</div>
      <div class="mx-2" style="font-size: 0.875rem; color: #a9a9a9">/</div>
      <div style="font-size: 0.875rem; color: #636363">V3BEDE32W</div>
      <v-icon class="ml-auto">mdi-chevron-right</v-icon>
    </div>
    <div class="px-3 py-6" style="display: flex">
      <div>
        <template v-for="color of product.colors">
          <v-img
            :key="color.ccolorcode"
            v-if="color.ccolorcode === selectedColor"
            :src="color.cimage1"
            lazy-src="@/assets/images/event/eventloader.jpg"
            width="100px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </template>
      </div>
      <div class="px-3">
        <div class="text-truncate" style="font-size: 0.875rem; font-weight: bolder">
          {{ product.bname }}
        </div>
        <div class="text-truncate mt-1" style="font-size: 0.875rem; color: #7c7c7c">
          {{ product.pname }}
        </div>
        <div class="text-truncate mt-1" style="font-size: 0.875rem; color: #7c7c7c">
          옵션: {{ selectedColor }} {{ selectedSize }}
        </div>
        <div class="text-truncate mt-3" style="font-size: 1rem; font-weight: bolder">
          {{
            (
              inputAmount *
              Math.floor((product.pprice * (100 - $store.state.product.gradeSale)) / 100)
            ).toLocaleString()
          }}<span style="font-size: 0.875rem; font-weight: bolder">원/ {{ inputAmount }}개</span>
        </div>
        <div class="mt-3" style="font-size: 0.875rem; font-weight: bolder; color: #ea7740">
          주문접수
        </div>
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
    return {};
  },
  // 컴포넌트 메소드 정의
  methods: {},
  props: {
    selectedColor: String,
    selectedSize: String,
    inputAmount: Number,
    product: Object,
  },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

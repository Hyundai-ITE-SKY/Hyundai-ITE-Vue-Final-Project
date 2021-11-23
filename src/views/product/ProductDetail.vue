<!-- 컴포넌트 UI 정의 주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item v-for="color in colors" :key="color">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <!--<div class="text-h2">Slide {{ i + 1 }}</div>-->
            <v-img :src="color" height="100%" />
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <div>
      <v-row class="pl-2 pr-5 d-flex align-center justify-center">
        <div
          class="mr-2 d-flex flex-row mt-5"
          width="50px"
          v-for="(chip, i) in colorchips"
          :key="i"
        >
          <v-img :src="chip"></v-img>
        </div>

        <v-col cols="11" class="font-weight-black pb-0">Brand</v-col>
        <v-col cols="1" class="pb-0"><v-icon>mdi-share-variant-outline</v-icon></v-col>
        <v-col cols="12" class="pt-0 pb-0">Product Name</v-col>
        <v-col cols="12" class="font-weight-black pt-0 pb-0">100,000￦</v-col>
        <v-col cols="12" class="pt-0 pb-0">Product Code</v-col>
      </v-row>
      <br />
      <v-divider></v-divider>
      <div>
        <div class="my-2 pl-4 pr-5">
          Lv1 혜택가 <span class="font-weight-black pt-0 pb-0">90,000￦</span>
        </div>
      </div>
      <v-divider></v-divider>
      <div>
        <v-col cols="12" class="pb-0 pl-4 pr-5">H.POINT : 100 p (0.1%)</v-col>
        <v-col cols="12" class="pb-0 pt-1 pl-4 pr-5">배송비 : 30,000원 이상 무료배송</v-col>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "ProductDetail",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data: () => ({
    model: 0,
    colors: [
      "http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_W01.jpg/dims/resize/684x1032/",
      "http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_W02.jpg/dims/resize/684x1032/",
      "http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_W03.jpg/dims/resize/684x1032/",
    ],
    colorchips: [
      "http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_C01.jpg/dims/resize/24x24",
      "http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_RP_C01.jpg/dims/resize/24x24",
    ],
  }),
  //컴포넌트 메서드 정의
  methods: {},
  created() {
    this.$store.commit("setOnTabs", false);
    this.$store.commit("setOnProduct", 1);
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

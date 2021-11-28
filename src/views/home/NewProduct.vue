<!-- 컴포넌트 UI 정의 -->
<template>
  <div>
    <div class="font-weight-bold text-center mt-2">NEW ITEM</div>

    <v-btn-toggle tile color="black accent-1" group>
      <v-btn value="left"> MAN </v-btn>
      <v-btn value="center"> WOMAN </v-btn>
      <v-btn value="right"> KIDS </v-btn>
      <v-btn value="justify"> LIFE STYLE </v-btn>
    </v-btn-toggle>

    <div class="text-center mt-2">
      <v-chip style="font-weight: bolder">OUTER</v-chip>
    </div>

    <v-slide-group class="pa-4" active-class="success">
      <v-slide-item v-for="n in 10" :key="n">
        <div>
          <v-card
            to="/product/detail"
            color="grey lighten-1"
            class="ma-2"
            height="33vw"
            width="25vw"
          >
            <v-sheet color="white" elevation="0" class="text-center pa-1">{{ n }}</v-sheet>
            <v-img
              lazy-src="@/assets/images/event/eventloader.jpg"
              src="@/assets/images/item/item1.jpg"
            ></v-img>
          </v-card>
          <div class="text-center text-caption" style="font-weight: bolder">LOIVIE</div>
          <div class="text-center text-caption">수딩 미스트</div>
          <div class="text-center text-caption" style="font-weight: bolder">9,900원</div>
        </div>
      </v-slide-item>
    </v-slide-group>

    <div class="text-center mt-2">
      <v-chip style="font-weight: bolder">TOP</v-chip>
    </div>

    <v-slide-group class="pa-4" active-class="success">
      <v-slide-item v-for="n in 10" :key="n">
        <div>
          <v-card
            to="/product/detail"
            color="grey lighten-1"
            class="ma-2"
            height="33vw"
            width="25vw"
          >
            <v-sheet color="white" elevation="0" class="text-center pa-1">{{ n }}</v-sheet>
            <v-img
              lazy-src="@/assets/images/event/eventloader.jpg"
              src="@/assets/images/item/item1.jpg"
            ></v-img>
          </v-card>
          <div class="text-center text-caption" style="font-weight: bolder">LOIVIE</div>
          <div class="text-center text-caption">수딩 미스트</div>
          <div class="text-center text-caption" style="font-weight: bolder">9,900원</div>
        </div>
      </v-slide-item>
    </v-slide-group>

    <div class="text-center mt-2">
      <v-chip style="font-weight: bolder">PANTS</v-chip>
    </div>

    <v-slide-group class="pa-4" active-class="success">
      <v-slide-item v-for="n in 10" :key="n">
        <div>
          <v-card
            to="/product/detail"
            color="grey lighten-1"
            class="ma-2"
            height="33vw"
            width="25vw"
          >
            <v-sheet color="white" elevation="0" class="text-center pa-1">{{ n }}</v-sheet>
            <v-img
              lazy-src="@/assets/images/event/eventloader.jpg"
              src="@/assets/images/item/item1.jpg"
            ></v-img>
          </v-card>
          <div class="text-center text-caption" style="font-weight: bolder">LOIVIE</div>
          <div class="text-center text-caption">수딩 미스트</div>
          <div class="text-center text-caption" style="font-weight: bolder">9,900원</div>
        </div>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "NewProduct",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return {};
  },
  // 컴포넌트 메소드 정의
  methods: {},
  created() {},
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

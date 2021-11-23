<!-- 컴포넌트 UI 정의 -->
<template>
  <div>
    <!--아이콘 wishlist 개수.. 어우-->
    <v-row dense class="text-center ma-0 pa-0 justify-center align-center">
      <v-col cols="auto" class="" style="white-space:nowrap">
        <!--<v-img
          style="display: inline-block"
          src="@/assets/images/heart.jpg"
          contain
          height="30px"
        />-->
        <v-icon class="red--text">mdi-cards-heart</v-icon>
      </v-col>
      <v-col cols="auto" class="">
        <span class="text-h6 font-weight-black">WISH LIST</span>
      </v-col>
      <v-col cols="auto" class="text-h6 font-weight-black">
        <span>1</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-img
          src="@/assets/images/wishlist-sample1.jpg"
          contain
          />
        <v-row>
          <v-col cols="9" class="font-weight-black pb-0">
            브랜드 명
          </v-col>
          <v-col cols="3" align-self="end" class="pb-0 pt-0">
            <v-icon class="red--text">mdi-cards-heart</v-icon>
          </v-col>
          <v-col cols="9" class="font-weight-black pb-0 pt-0">
              제품명
          </v-col>
          <v-col cols="9" class="font-weight-black pt-0">
              100,000
          </v-col>
        </v-row>
        <v-col cols="12" class="ma-0 pa-0 text-center">
          <v-btn class="black white--text font-weight-black">장바구니 담기</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "WishList",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return {};
  },
  // 컴포넌트 메소드 정의
  methods: {},
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

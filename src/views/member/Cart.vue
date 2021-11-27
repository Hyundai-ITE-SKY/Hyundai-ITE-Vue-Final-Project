<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div>
    <div class="d-flex justify-space-between mt-5 ml-4 mr-4 mb-0">
      <v-checkbox color="black" class="mt-0 pt-0">
        <template v-slot:label class="mb-0">
          <div style="font-size: 14px">전체선택</div>
        </template>
      </v-checkbox>
      <div class="align-center">
        <a class="grey--text" style="font-size: 14px">선택삭제</a>
      </div>
    </div>
    <!--반복되는 부분-->
    <v-divider></v-divider>
    <div class="white d-flex ma-0 pa-0 mb-2 mt-5">
      <v-row class="ma-0">
        <v-col cols="1">
          <v-checkbox></v-checkbox>
        </v-col>
        <v-col cols="3" class="pa-0 pl-3">
          <div style="width: 80px">
            <v-img src="@/assets/images/wishlist-sample1.jpg" contain />
          </div>
        </v-col>
        <v-col class="ml-2">
          <v-row>
            <v-col cols="9" class="pa-0 font-weight-black text-truncate" style="font-size: 15px"
              >브랜드</v-col
            >
            <v-col cols="1" class="mr-2 pa-0"
              ><v-icon class="red--text">mdi-cards-heart</v-icon></v-col
            >
            <v-col cols="1" class="pa-0 pr-1"><v-icon>mdi-close</v-icon></v-col>
            <v-col cols="12" class="pa-0 text-truncate" style="font-size:15px;">상품명</v-col>
            <v-col cols="12" class="pa-0" style="font-size:14px;color:grey">옵션 : 색상_사이즈</v-col>
            <v-col cols="12" class="pa-0"  style="font-size:14px;color:grey">수량 : 1</v-col>
            <v-col cols="12" class="font-weight-black ma-0 pt-2">100,000 원</v-col>
          </v-row>
        </v-col>

        <v-layout class="justify-center">
          <v-card-actions class="mb-3 mt-3 pt-0">
            <v-btn dark class="mr-3" outlined color="black">옵션/수량</v-btn>
            <v-btn dark to="/order/order" outlined color="black">바로 구매</v-btn>
          </v-card-actions>
        </v-layout>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "Cart",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {};
  },
  //컴포넌트 메서드터 정의
  methods: {},
  created() {
    // if (this.$store.getters["login/getUserId"] === "") {
    //   this.$router.push("/login");
    // }
    this.$store.commit("setOnTabs", false);
    this.$store.commit("setOnProduct", 0);
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

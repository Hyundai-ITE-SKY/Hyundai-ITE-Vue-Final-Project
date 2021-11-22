<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div class="blue-grey lighten-4 pr-2 pl-2 pb-2">
    <v-container class="px-0 pt-0 d-flex flex-row justify-space-between align-center" fluid>
      <v-checkbox v-model="checkbox" label="전체상품 (1)"></v-checkbox>
      <a class="black--text">선택삭제</a>
    </v-container>

    
    <div class="white d-flex pr-2 pl-2 mb-2">
      <v-row>
        <v-col cols="1">
          <v-checkbox v-model="checkbox"></v-checkbox>
        </v-col>
        <v-col cols="4">
          <v-img src="@/assets/images/wishlist-sample1.jpg" contain height="200px"/>
        </v-col>
        <v-col cols="7">
          <v-row>
            <v-col cols="8" class="pb-0"></v-col>
            <v-col cols="1" class="mr-2 pb-0"><v-icon class="red--text">mdi-cards-heart</v-icon></v-col>
            <v-col cols="1" class="pb-0 pr-1"><v-icon>mdi-close</v-icon></v-col>
            
            <v-col cols="12" class="pt-0 pb-0">상품명</v-col>

            <v-col cols="12" class="pt-0 pb-0">옵션 : 색상_사이즈</v-col>

            <v-col cols="12" class="pt-0 pb-0">수량 : 1</v-col>

            <v-col cols="12" class="font-weight-black pt-2 pb-0">100,000 원</v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="d-flex align-center justify-center mb-3 pt-0">
          <v-btn dark class="mr-3">옵션/수량</v-btn>
          <v-btn dark>바로 구매</v-btn>
        </v-col>
      </v-row>
    </div>
    
    <div class="white d-flex pr-2 pl-2 mb-2">
      <v-row>
        <v-col cols="1">
          <v-checkbox v-model="checkbox"></v-checkbox>
        </v-col>
        <v-col cols="4">
          <v-img src="@/assets/images/wishlist-sample1.jpg" contain height="200px"/>
        </v-col>
        <v-col cols="7">
          <v-row>
            <v-col cols="8" class="pb-0"></v-col>
            <v-col cols="1" class="mr-2 pb-0"><v-icon class="red--text">mdi-cards-heart</v-icon></v-col>
            <v-col cols="1" class="pb-0 pr-1"><v-icon>mdi-close</v-icon></v-col>
            
            <v-col cols="12" class="pt-0 pb-0">상품명</v-col>

            <v-col cols="12" class="pt-0 pb-0">옵션 : 색상_사이즈</v-col>

            <v-col cols="12" class="pt-0 pb-0">수량 : 1</v-col>

            <v-col cols="12" class="font-weight-black pt-2 pb-0">100,000 원</v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="d-flex align-center justify-center mb-3 pt-0">
          <v-btn dark class="mr-3">옵션/수량</v-btn>
          <v-btn dark>바로 구매</v-btn>
        </v-col>
      </v-row>
    </div>
    
    
  </div>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {};
  },
  //컴포넌트 메서드터 정의
  methods: {},
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

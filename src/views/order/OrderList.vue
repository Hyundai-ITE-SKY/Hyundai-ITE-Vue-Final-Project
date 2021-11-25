<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div>
    <v-row class="d-flex align-center justify-center my-2">
      <v-col
        cols="2"
        class="d-flex flex-column align-center justify-center mx-1 pb-0"
        v-for="(order, i) in orders"
        :key="i * 2"
      >
        <div v-if="order.value === 0" class="text-h4 grey--text">{{ order.value }}</div>
        <div v-if="order.value !== 0" class="text-h4">{{ order.value }}</div>
      </v-col>
      <v-col
        cols="2"
        class="d-flex flex-column align-center justify-center mx-1 pt-0"
        v-for="(order, i) in orders"
        :key="i * 2 + 1"
      >
        <div class="font-weight-black pl-2">{{ order.status }}</div>
      </v-col>
    </v-row>

    <div class="blue-grey lighten-5 pa-1">
      <div class="d-flex align-center justify-space-between px-4">
        <span>2021.11.11 / Order Code</span>
        <span>상세보기</span>
      </div>
      <v-row class="white d-flex justify-center align-center my-1 py-0">
        <v-col cols="4"
          ><v-img
            src="http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_W01.jpg/dims/resize/684x1032/"
            contain
            height="200px"
        /></v-col>
        <v-col cols="8">
          <v-row>
            <v-col cols="12" class="font-weight-black pa-0"> Brand Name </v-col>
            <v-col cols="12" class="pa-0 grey--text"> Product Name </v-col>
            <v-col cols="12" class="pa-0 grey--text">
              옵션: COLOR/SIZE {{ product.color }} {{ product.size }}
            </v-col>
            <v-col cols="12" class="pa-0"> 100,000￦ </v-col>
            <v-col cols="12" class="pa-0 orange--text font-weight-black"> 주문접수 </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div style="text-align: center">
        <span class="font-weight-black">주문취소</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "OrderList",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      orders: [
        { status: "전체", value: 13 },
        { status: "결제", value: 1 },
        { status: "배송", value: 0 },
        { status: "배송완료", value: 0 },
        { status: "구매확정", value: 12 },
      ],
      product: { color: "BLUE GRAY", size: "FREE" },
    };
  },
  //컴포넌트 메서드터 정의
  methods: {},
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

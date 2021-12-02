<!--컴포넌트 UI 정의-->
<template>
  <div>
    <h3 class="text-center mt-2">입금 확인 후 제품이 발송됩니다</h3>
    <div class="ma-3">
      <v-img src="@/assets/images/successimg.jpg"></v-img>
    </div>
    <div class="ml-5 mr-5 mb-2">
      <!--주문완료 배송지 정보-->
      <div class="d-flex mb-3">
        <div style="width: 90px; font-weight: bold">배송지</div>
        <div v-show="!showDelivery" class="d-inline-block text-truncate" style="max-width: 200px">
          서민철 | 01797 서울시 어쩌구 무슨동 어쩌고 저쩌고
        </div>
        <div class="ml-auto">
          <v-icon icon @click="showDelivery = !showDelivery">
            {{ showDelivery ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </div>
      </div>
      <v-expand-transition>
        <div v-show="showDelivery" style="margin-left: 90px" class="mb-2">
          <v-card-text class="pa-0" style="color: #5d5d5d">
            010 - 0000 - 000<br />
            서울시 어쩌구 무슨동<br />
            상세 주소
          </v-card-text>
        </div>
      </v-expand-transition>

      <!--주문완료 상품 정보-->
      <div class="d-flex mb-3">
        <div style="width: 90px; font-weight: bold">상품정보</div>
        <div class="d-inline-block text-truncate" style="max-width: 200px">카멜 재킷</div>
        <div class="ml-auto">
          <v-icon icon @click="showProduct = !showProduct">
            {{ showProduct ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </div>
      </div>
      <!--밑으로 클릭하면 나오는 부분-->
      <v-expand-transition>
        <div v-show="showProduct">
          <v-divider></v-divider>
          <div class="pa-1 d-flex">
            <div style="width: 60px">
              <v-img
                src="http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_W01.jpg/dims/resize/684x1032/"
              ></v-img>
            </div>
            <v-card-text style="font-size: 11px; width: 60%" class="pa-0 pl-2"
              >MINE<br />카멜 재킷<br />
              <v-card-subtitle style="font-size: 10px; color: grey" class="pa-0"
                >옵션 : LIGHT YELLOW / 82(55)<br />
                수량 1개</v-card-subtitle
              >
            </v-card-text>
            <div class="d-flex align-center" style="width: 100px">
              <span>1,350,000원</span>
            </div>
          </div>
        </div>
      </v-expand-transition>

      <div class="d-flex mb-3">
        <div style="width: 90px; font-weight: bold">결제금액</div>
        <div>1,350,000원</div>
      </div>

      <div class="d-flex mb-3">
        <div style="width: 90px; font-weight: bold">결제정보</div>
        <div>우리은행 26958327518299</div>
      </div>
    </div>
    <v-card-actions class="justify-center">
      <v-btn outlined to="/order/list">주문내역 조회</v-btn>
      <v-btn color="black" dark to="/">홈으로 가기</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      showDelivery: false,
      showProduct: false,
    };
  },
  //컴포넌트 메서드 정의
  methods: {},
  created() {
    this.$store.commit("gnb/setCurrentPage", "ordersuccess");
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

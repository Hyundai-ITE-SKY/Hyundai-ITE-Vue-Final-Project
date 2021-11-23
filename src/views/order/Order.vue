<!--컴포넌트 UI 정의-->
<template>
  <div>
    <!--주문자 정보-->
    <v-card class="mx-auto mt-5 mb-5" max-width="344">
      <div class="d-flex justify-space-between">
        <h4 class="pa-0 pl-3 pt-3 pb-3">주문자 정보</h4>
        <span class="pa-0 pl-3 pt-3" style="font-size: 14px">
          서민철 | 010 - 0000 - 0000
          <v-icon icon @click="showOrder = !showOrder">
            {{ showOrder ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </span>
      </div>
      <!--밑으로 클릭하면 나오는 부분-->
      <v-expand-transition>
        <div v-show="showOrder">
          <v-divider></v-divider>
          <v-card-text>주문자 정보</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <!--배송지-->
    <v-card class="mx-auto mb-5" max-width="344">
      <div class="d-flex justify-space-between">
        <h4 class="pa-0 pl-3 pt-3 pb-3">배송지</h4>
        <v-icon icon @click="showDelivery = !showDelivery">
          {{ showDelivery ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon
        >
      </div>
      <!--밑으로 클릭하면 나오는 부분-->
      <v-expand-transition>
        <div v-show="showDelivery">
          <v-divider></v-divider>
          <v-card-text>
            서민철 010 - 0000 - 000<br />
            서울시 어쩌구 무슨동<br />
            상세 주소
          </v-card-text>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="items" label="배송 시 요청사항을 선택해주세요" dense solo></v-select>
          </v-col>
        </div>
      </v-expand-transition>
    </v-card>

    <!--상품 정보-->
    <v-card class="mx-auto mb-5" max-width="344">
      <div class="d-flex justify-space-between">
        <h4 class="pa-0 pl-3 pt-3 pb-3">상품 정보</h4>
        <v-icon icon @click="showProduct = !showProduct">
          {{ showProduct ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon
        >
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
    </v-card>

    <v-card class="mx-auto mb-5" max-width="344">
      <div class="d-flex justify-space-between">
        <h4 class="pa-0 pl-3 pt-3 pb-3">쿠폰/할인/적립금</h4>
        <v-icon icon @click="showDiscount = !showDiscount">
          {{ showDiscount ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </div>
      <!--밑으로 클릭하면 나오는 부분-->
      <v-expand-transition>
        <div v-show="showDiscount">
          <v-divider></v-divider>
          <v-card-text> 정보 </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card class="mx-auto mb-5" max-width="344">
      <div class="d-flex justify-space-between">
        <h4 class="pa-0 pl-3 pt-3 pb-3">결제 정보</h4>
        <v-icon icon @click="showPayment = !showPayment">
          {{ showPayment ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </div>
      <!--밑으로 클릭하면 나오는 부분-->
      <v-expand-transition>
        <div v-show="showPayment">
          <v-divider></v-divider>
          <v-radio-group v-model="radios" class="mt-2 ml-2 pt-2">
            <v-radio value="일반 결제" color="indigo darken-3">
              <template v-slot:label>
                <div style="font-size: 15px; color: black">일반 결제</div>
              </template>
            </v-radio>
          </v-radio-group>
          <div class="d-flex justify-space-around">
            <v-btn class="ma-0" outlined color="indigo" width="45%" height="40"> 신용카드 </v-btn>
            <v-btn class="ma-0" outlined color="grey" width="45%" height="40"> 가상계좌 </v-btn>
          </div>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="cards"
              label="카드를 선택하세요"
              dense
              solo
              color="indigo darken-3"
              item-color="indigo darken-3"
            ></v-select>
          </v-col>
        </div>
      </v-expand-transition>
    </v-card>
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
      showOrder: true,
      showDelivery: true,
      showProduct: true,
      showDiscount: true,
      showPayment: true,
      radios: "일반 결제",
      items: [
        "부재 시 경비실에 맡겨주세요",
        "배송 전 연락 바랍니다",
        "부재 시 집 앞에 놔주세요",
        "파손의 위험이 있는 상품입니다. 배송 시 주의해주세요.",
      ],
      cards: ["신한카드", "우리카드", "롯데카드", "삼성카드", "기업카드"],
    };
  },
  //컴포넌트 메서드 정의
  methods: {},
  created() {
    this.$store.commit("setOnTabs", false);
    this.$store.commit("setOnProduct", 2);
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

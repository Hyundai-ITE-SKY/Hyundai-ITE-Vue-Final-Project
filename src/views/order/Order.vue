<!--컴포넌트 UI 정의-->
<template>
  <div>
    <!--주문자 정보-->
    <v-card class="mx-auto mt-5 mb-5" max-width="344" outlined>
      <div class="d-flex justify-space-between">
        <h4 class="pa-0 pl-3 pt-3 pb-3">주문자 정보</h4>
        <span class="px-3 pt-3" style="font-size: 14px">
          {{ member.mname }} &nbsp;|&nbsp; {{ member.mtel }}
        </span>
      </div>
    </v-card>

    <!--배송지-->
    <v-card class="mx-auto mb-5" max-width="344">
      <div class="d-flex justify-space-between align-center">
        <h4 class="px-3 py-3">배송지</h4>
        <span class="py-3">
          <delivery-component></delivery-component>
          <v-icon class="pl-1" icon @click="showDelivery = !showDelivery">
            {{ showDelivery ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon
          >
        </span>
      </div>
      <!--밑으로 클릭하면 나오는 부분-->
      <v-expand-transition>
        <div v-show="showDelivery">
          <v-divider></v-divider>
          <v-card-text>
            {{ member.mname }} &nbsp; {{ member.mtel }}<br />
            우편번호 &nbsp; {{ member.mzipcode }} <br />
            {{ member.maddress1 }}<br />
            {{ member.maddress2 }}<br />
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

          <div class="pa-1 d-flex" v-for="item of orderItems" :key="item.pid">
            <div style="width: 60px">
              <v-img
                v-if="productsInfo"
                :src="`${productsInfo.find((x) => x.pid === item.pid).cimage1}`"
                height="100%"
              >
              </v-img>
            </div>
            <v-card-text style="font-size: 11px; width: 60%" class="pa-0 pl-2">
              {{ productsInfo.find((x) => x.pid === item.pid).bname }}<br />
              {{ productsInfo.find((x) => x.pid === item.pid).pname }}<br />
              <v-card-subtitle style="font-size: 10px; color: grey" class="pa-0">
                옵션 : {{ item.ccolorcode }} / {{ item.psize }}<br />
                수량 {{ item.oamount }}개</v-card-subtitle
              >
            </v-card-text>
            <div class="d-flex align-center" style="width: 100px">
              <span
                >{{ productsInfo.find((x) => x.pid === item.pid).pprice.toLocaleString() }}원</span
              >
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
          <v-card-text>
            <v-container>
              <v-row no-gutters class="d-flex justify-space-between align-center">
                <!-- 수령인/연락처 -->
                <v-col cols="8">
                  <div class="text-subtitle-1">쿠폰 전체 {{ coupon.length }}장</div>
                </v-col>
                <v-col cols="3">
                  <coupon-component :coupon="coupon"></coupon-component>
                </v-col>

                <v-col cols="8">
                  <v-text-field label="포인트"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-btn dark class="px-2">모두 사용</v-btn>
                </v-col>
                잔여 포인트 &nbsp; {{ member.mpoint.toLocaleString() }} P
              </v-row>
            </v-container>
          </v-card-text>
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
import apiMember from "@/apis/member";
import apiOrder from "@/apis/order";
import apiProduct from "@/apis/product";
import DeliveryComponent from "./DeliveryComponent.vue";
import CouponComponent from "./CouponComponent.vue";

export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: {
    DeliveryComponent,
    CouponComponent,
  },
  //컴포넌트 데이터 정의
  data() {
    return {
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
      member: { mpoint: 1000000 }, //사용자 정보
      orderItems: [
        { ccolorcode: "CB", oamount: 12, oid: "testorder", pid: "CM2B4WPC586WP1", psize: "FREE" },
      ], //주문 제품 정보들
      order: null, //orderList 테이블
      oid: null,
      productsInfo: [
        {
          bname: "the CASHMERE",
          cimage1:
            "http://newmedia.thehandsome.com/CM/2B/SS/CM2B4WPC586WP1_CB_W01.jpg/dims/resize/684x1032/",
          pid: "CM2B4WPC586WP1",
          pname: "백 밴딩 스트레이트 팬츠",
          pprice: 345000,
        },
      ], //주문한 제품들의 상세 정보
      coupon: {
        cid: "cid",
      },
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    getMember() {
      apiMember
        .getMember()
        .then((response) => {
          this.member = response.data;
          console.log("member : ", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //oid로 orderList와 orderitem 가져오기
    getOrderListItem() {
      apiOrder
        .getOrderListItem(this.oid)
        .then((response) => {
          this.orderItems = response.data.orderitem;
          this.order = response.data.orderlist;
          console.log("orderItems : ", this.orderItems);
          console.log("order : ", this.order);

          this.getProductInfo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //pid로 product info 가져오기
    getProductInfo() {
      for (let item of this.orderItems) {
        let pid = item.pid;
        apiProduct
          .getProductInfo(pid, item.ccolorcode)
          .then((res) => {
            this.productsInfo.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      console.log("productsInfo : ", this.productsInfo);
    },
    //쿠폰 정보 획득
    getCoupon() {
      apiMember
        .getCoupon()
        .then((response) => {
          this.coupon = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.$store.commit("gnb/setCurrentPage", "order");
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
      return;
    }
    this.getMember();
    this.getCoupon();
    //oid 받기
    this.oid = this.$route.query.oid;
    this.getOrderListItem();
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

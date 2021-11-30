<!--컴포넌트 UI 정의-->
<template>
  <div>
    <!-- 입금 계좌 입금 금액 -->
    <v-card class="pa-5 mb-3" outlined>
      <div class="d-flex justify-space-between mb-2">
        <span style="font-size: 14px">입금 계좌</span>
        <span style="font-size: 14px">우리은행 26763644118324</span>
      </div>
      <div class="d-flex justify-space-between">
        <span style="font-size: 14px">입금 금액</span>
        <span style="font-weight: bold; font-size: 14px"
          >{{ orderlist.ototal.toLocaleString() }}원</span
        >
      </div>
    </v-card>
    <!-- 주문한 상품 정보 -->
    <v-card class="mb-3" outlined>
      <div class="d-flex justify-space-between pt-3 pb-3 pl-5 pr-5">
        <span style="font-size: 13px"> No.{{ orderlist.oid }} </span>
        <span style="color: grey; font-size: 13px">{{ orderlist.odate }}</span>
      </div>
      <v-divider></v-divider>
      <!--반복-->
      <div v-for="item in orderitems" :key="item.pid">
        <div v-for="i in orderitem" :key="i.pid">
          <div v-if="item.pid == i.pid" class="px-3 py-3" style="display: flex">
            <div>
              <div>
                <v-img
                  :src="item.cimage1"
                  lazy-src="@/assets/images/event/eventloader.jpg"
                  width="80px"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>
            </div>
            <div class="mx-3">
              <div style="font-size: 0.875rem; font-weight: bolder; color: #ea7740">주문접수</div>
              <div class="text-truncate" style="font-size: 0.7rem">{{ item.bname }}</div>
              <div class="text-truncate" style="font-size: 0.875rem; font-weight: bolder">
                {{ item.pname }}
              </div>
              <div class="text-truncate mt-1" style="font-size: 0.875rem; color: #7c7c7c">
                {{ i.ccolorcode }} | {{ i.psize }}
              </div>
              <div class="text-truncate mt-3" style="font-size: 1rem; font-weight: bolder">
                <span style="font-size: 0.875rem; font-weight: bolder"
                  >{{ (item.pprice*i.oamount).toLocaleString() }}원/ {{ i.oamount }}개</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
    <!--배송지 정보-->
    <v-card class="mb-3" outlined>
      <div class="d-flex justify-space-between pl-5 pr-5 pt-2 pb-2">
        <span style="font-weight: bold; font-size: 18px" class="align-center">배송지 정보</span>
        <v-btn icon @click="showAddress = !showAddress">
          <v-icon>{{ showAddress ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="showAddress" class="pl-5 pr-5 pb-5">
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">받으시는 분</span>
            <span style="font-size: 14px">{{ orderlist.oreceiver }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">연락처</span>
            <span style="font-size: 14px">{{ orderlist.otel }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">배송지</span>
            <span style="font-size: 14px"
              >({{ orderlist.ozipcode }}) {{ orderlist.oaddress1 }}<br />
              {{ orderlist.oaddress2 }}</span
            >
          </div>
        </div>
      </v-expand-transition>
    </v-card>
    <!--최종 결제 정보-->
    <v-card class="mb-3" outlined>
      <div class="d-flex justify-space-between pl-5 pr-5 pt-2 pb-2">
        <span style="font-weight: bold; font-size: 18px" class="align-center">최종 결제 정보</span>
        <v-btn icon @click="showPayment = !showPayment">
          <v-icon>{{ showPayment ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="showPayment" class="pl-5 pr-5 pb-5">
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">상품 합계</span>
            <span style="font-size: 14px">할인 전 금액</span>
          </div>
          <div class="d-flex justify-space-between pb-5">
            <span style="font-size: 14px">할인 합계</span>
            <span style="font-size: 14px">-할인 금액</span>
          </div>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between pt-5" style="font-weight: bold">
            <span>결제 금액</span>
            <span>총 결제금액</span>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import apiProduct from "@/apis/product";
// import apiOrder from "@/apis/order";

export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "OrderDetail",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      showAddress: false,
      showPayment: false,
      orderitems: [],
      selectedColors: ["SR", "WT"],
      selectedSizes: ["00", "M"],
      inputAmounts: [1, 1],
      orderlist: {
        oid: "testorder",
        mid: "mid1",
        ozipcode: 12345,
        oaddress1: "address1",
        oaddress2: "address2",
        odate: "2021-11-23T10:45:22.000+00:00",
        oreceiver: "user",
        otel: "01053705930",
        ousedmileage: 100,
        ousedcoupon: 1,
        opayment: 1,
        ostatus: 1,
        oaccountdeadline: "2021-11-23T10:45:22.000+00:00",
        odiscounted: 0,
        ototal: 964750,
      },
      orderitem: [
        {
          oid: "testorder",
          pid: "CM2B4WPC586WP1",
          ccolorcode: "CB",
          psize: "FREE",
          oamount: 1,
        },
        {
          oid: "testorder",
          pid: "CM2B4WPC587W",
          ccolorcode: "GK",
          psize: "FREE",
          oamount: 2,
        },
      ],
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    async getOrderListItem(){}
    ,
    async getProductInfo() {
      for (let i of this.orderitem) {
        await apiProduct
          .getProductInfo(i.pid, i.ccolorcode)
          .then((response) => {
            // console.log(response.data);
            this.orderitems.push(response.data);
          })
          .catch(() => {});
      }
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("gnb/setCurrentPage", "orderdetail");
    this.getProductInfo();
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

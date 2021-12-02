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
          >{{ orderinfo.ototal.toLocaleString() }}원</span
        >
      </div>
    </v-card>
    <!-- 주문한 상품 정보 -->
    <v-card class="mb-3" outlined>
      <div class="d-flex justify-space-between pt-3 pb-3 pl-5 pr-5">
        <span style="font-size: 13px"> No.{{ orderinfo.oid }} </span>
        <span style="color: grey; font-size: 13px">{{ getKoreanTime(orderinfo.odate) }}</span>
      </div>
      <v-divider></v-divider>
      <!--반복-->
      <div v-for="(item, i) in orderitems" :key="i">
        <div v-for="(info, j) in productinfo" :key="j">
          <div v-if="item.pid == info.pid" class="px-3 py-3" style="display: flex">
            <div>
              <div>
                <v-img
                  :src="info.cimage1"
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
              <div style="font-size: 0.7rem; font-weight: bolder; color: #ea7740">주문접수</div>
              <div class="text-truncate" style="font-size: 0.7rem">{{ info.bname }}</div>
              <div class="text-truncate" style="font-size: 0.875rem; font-weight: bolder">
                {{ info.pname }}
              </div>
              <div class="text-truncate mt-1" style="font-size: 0.875rem; color: #7c7c7c">
                {{ item.ccolorcode }} | {{ item.psize }}
              </div>
              <div class="text-truncate mt-3" style="font-size: 1rem; font-weight: bolder">
                <span style="font-size: 0.875rem; font-weight: bolder"
                  >{{ (info.pprice * item.oamount).toLocaleString() }}원/ {{ item.oamount }}개</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
    <!--배송지 정보-->
    <v-card class="mb-3" outlined>
      <div class="d-flex justify-space-between align-center pl-5 pr-5 pt-2 pb-2">
        <span style="font-weight: bold; font-size: 18px" class="align-center">배송지 정보</span>
        <v-btn icon @click="showAddress = !showAddress">
          <v-icon>{{ showAddress ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="showAddress" class="pl-5 pr-5 pb-5">
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">받으시는 분</span>
            <span style="font-size: 14px">{{ orderinfo.oreceiver }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">연락처</span>
            <span style="font-size: 14px">{{ orderinfo.otel }}</span>
          </div>
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">배송지</span>
            <div align="right" style="font-size: 14px">
              ({{ orderinfo.ozipcode }}) {{ orderinfo.oaddress1 }}<br />
              {{ orderinfo.oaddress2 }}
            </div>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
    <!--최종 결제 정보-->
    <v-card class="mb-3" outlined>
      <div class="d-flex justify-space-between align-center pl-5 pr-5 pt-2 pb-2">
        <span style="font-weight: bold; font-size: 18px" class="align-center">최종 결제 정보</span>
        <v-btn icon @click="showPayment = !showPayment">
          <v-icon>{{ showPayment ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="showPayment" class="pl-5 pr-5 pb-5">
          <div class="d-flex justify-space-between">
            <span style="font-size: 14px">상품 합계</span>
            <span style="font-size: 14px"
              >{{ (orderinfo.ototal + orderinfo.odiscounted).toLocaleString() }} 원</span
            >
          </div>
          <div class="d-flex justify-space-between pb-5">
            <span style="font-size: 14px">할인 합계</span>
            <span style="font-size: 14px">- {{ orderinfo.odiscounted.toLocaleString() }} 원</span>
          </div>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between pt-5" style="font-weight: bold">
            <span>결제 금액</span>
            <span>{{ orderinfo.ototal.toLocaleString() }} 원</span>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import apiProduct from "@/apis/product";
import apiOrder from "@/apis/order";

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
      orderinfo: [],
      productinfo: [],
      beforeDiscounted: 0,
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    //넘긴 oid를 받아서 orderitems와 orderinfo을 불러온다.
    async getOrderListItem(oid) {
      await apiOrder
        .getOrderListItem(oid)
        .then((response) => {
          this.orderitems = response.data.orderitem;
          this.orderinfo = response.data.orderlist;
          for (let item of this.orderitems) {
            this.getProductInfo(item.pid, item.ccolorcode);
          }
        })
        .catch(() => {});
    },
    async getProductInfo(pid, ccolorcode) {
      await apiProduct
        .getProductInfo(pid, ccolorcode)
        .then((response) => {
          this.productinfo.push(response.data);
        })
        .catch(() => {});
    },
    getKoreanTime(date) {
      let time = new Date(date);
      return time.toLocaleString();
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("gnb/setCurrentPage", "orderdetail");
    var oid = this.$route.query.oid;
    this.getOrderListItem(oid);
    // this.getProductInfo();
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

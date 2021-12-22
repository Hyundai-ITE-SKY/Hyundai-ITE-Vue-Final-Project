<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div style="background-color: #fafafa">
    <div style="display: flex" class="justify-space-between px-6 pt-6">
      <div
        v-for="(order, i) of orders"
        :key="order.status"
        class="text-center"
        style="width: 48px; height: 48px; color: black"
      >
        <div
          :style="`font-size: 1.5rem; font-weight: bolder; color: ${getFontColor(order.value, i)}`"
        >
          {{ order.value }}
        </div>
        <div style="font-size: 0.7rem">{{ order.status }}</div>
      </div>
    </div>
    <div class="mt-6 px-6">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            style="font-size: 0.875rem; font-weight: bolder"
            v-model="dateRangeText"
            label="검색 범위"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dates" range scrollable color="black" locale="ko-KR" full-width>
          <v-spacer></v-spacer>
          <v-btn text color="black" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="black" @click="$refs.menu.save(dates)"> OK </v-btn>
        </v-date-picker>
      </v-menu>
      <div class="d-flex justify-center mb-5">
        <v-btn rounded dark color="black" @click="searchOdate()">날짜 검색</v-btn>
      </div>
      <span id="searchText" style="font-size:0.75rem; font-weight: bolder;">
      </span>
    </div>
    <div v-for="(order, i) of orderlist" :key="i">
      <div
        class="pa-3 align-center"
        style="
          display: flex;
          background-color: #fafafa;
          border-top: solid 2px #ededed;
          border-bottom: solid 2px #ededed;
        "
      >
        <div style="font-weight: bolder; font-size: 0.875rem">{{ getKoreanTime(order.odate) }}</div>
        <div class="mx-2" style="font-size: 0.875rem; color: #a9a9a9">/</div>
        <div style="font-size: 0.875rem; color: #636363">{{ order.oid }}</div>
        <v-icon class="ml-auto" @click="moveToOrderDetail(order.oid)">mdi-chevron-right</v-icon>
      </div>
      <div v-for="(item, j) of order.orderitem" :key="j">
        <div v-if="products.find((x) => x.pid === item.pid) !== undefined">
          <order-item :order="item" :product="products.find((x) => x.pid === item.pid)">
          </order-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderItem from "./OrderItem.vue";
import apiOrder from "@/apis/order";
import apiProduct from "@/apis/product";

export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "OrderList",
  //추가하고 싶은 컴포넌트를 등록
  components: { OrderItem },
  //컴포넌트 데이터 정의
  data() {
    return {
      dates: ["2021-12-01", "2021-12-31"],
      menu: false,
      orders: [
        { status: "전체", value: 0 },
        { status: "결제", value: 0 },
        { status: "배송", value: 0 },
        { status: "배송완료", value: 0 },
        { status: "구매확정", value: 0 },
      ],
      orderState: [],
      orderlist: null,
      products: [],
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    getFontColor(value, i) {
      if (i == 0) {
        return "#266df6";
      }

      if (value > 0) {
        return "black";
      }
      return "#A3A3A3";
    },
    getKoreanTime(date) {
      let time = new Date(date);
      return time.toLocaleString();
    },
    //주문 정보 획득
    async getOrderState() {
      await apiOrder
        .getOrderState(this.$store.getters["login/getUserId"])
        .then((response) => {
          this.orderState = response.data;

          for (let item of this.orderState) {
            this.orders[item.ostatus].value = item.count;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getProductInfo(pid, ccolorcode) {
      await apiProduct.getProductInfo(pid, ccolorcode).then((response) => {
        this.products.push(response.data);
      });
    },
    async getOrderList() {
      await apiOrder.getOrderList().then((response) => {
        this.orderlist = response.data;
        this.orderlist = this.orderlist.sort(function (a, b) {
          return b.oid - a.oid;
        });

        for (let order of this.orderlist) {
          let item = order.orderitem;
          for (let i of item) {
            this.getProductInfo(i.pid, i.ccolorcode);
          }
        }
      });
    },
    moveToOrderDetail(oid) {
      this.$router.push(`/order/detail?oid=${oid}`);
    },
    // 주문일자 범위로 검색하기
    async searchOdate() {
      await apiOrder.getOrderListByOdate(this.dates[0], this.dates[1]).then((response) => {
        this.orderlist = response.data;
        this.orderlist = this.orderlist.sort(function (a, b) {
          return b.oid - a.oid;
        });

        for (let order of this.orderlist) {
          let item = order.orderitem;
          for (let i of item) {
            this.getProductInfo(i.pid, i.ccolorcode);
          }
        }
        var resultText = document.querySelector("#searchText");
        resultText.innerHTML = `총 ${this.orderlist.length}건의 결과가 검색되었습니다.`;
      });
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("gnb/setCurrentPage", "orderlist");
    this.getOrderList();
    this.getOrderState();
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

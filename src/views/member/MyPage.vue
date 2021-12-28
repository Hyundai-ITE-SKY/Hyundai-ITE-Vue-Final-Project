<!--컴포넌트 UI 정의-->
<template>
  <div>
    <div class="align-center pa-6" style="display: flex; border-bottom: solid 8px #f1f1f1">
      <div class="py-3 pr-3">
        <v-avatar :size="70">
          <img src="@/assets/images/profile.png" />
        </v-avatar>
      </div>
      <div>
        <div style="font-size: 1.5rem; font-weight: bolder">
          {{ member.mname }}<span style="font-size: 1rem">님 안녕하세요!</span>
        </div>
        <div style="font-size: 0.875rem; color: #6f6f6f">
          회원님의 등급은
          <span style="font-size: 1rem; color: red; font-weight: bolder">{{ member.mgrade }}</span
          >입니다.
        </div>
      </div>
      <v-btn rounded text outlined color="#868686" elevation="0" class="ml-auto">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </div>
    <div class="pt-3">
      <div class="text-center" style="font-size: 0.875rem; font-weight: bolder; color: black">
        보유 포인트 및 쿠폰 현황
      </div>
      <div
        class="align-center px-6 pb-6 pt-3 justify-space-between"
        style="display: flex; border-bottom: solid 8px #f1f1f1"
      >
        <div class="text-center" style="width: 30vw">
          <v-icon :size="36" color="#6F6F6F">mdi-alpha-p-circle-outline</v-icon>
          <div style="font-size: 0.875rem; color: #6f6f6f">포인트</div>
          <div class="mt-2 text-truncate" style="font-size: 1rem; font-weight: bolder">
            {{ member.mpoint.toLocaleString() }}P
          </div>
        </div>
        <div class="text-center" style="width: 30vw">
          <v-icon :size="36" color="#6F6F6F">mdi-ticket-percent-outline</v-icon>
          <div style="font-size: 0.875rem; color: #6f6f6f">보유 쿠폰</div>
          <div class="mt-2 text-truncate" style="font-size: 1rem; font-weight: bolder">
            {{ coupon.length }}장
          </div>
        </div>
        <div class="text-center" style="width: 30vw">
          <v-icon :size="36" color="#6F6F6F">mdi-package-variant-closed</v-icon>
          <div style="font-size: 0.875rem; color: #6f6f6f">구매상품</div>
          <div class="mt-2 text-truncate" style="font-size: 1rem; font-weight: bolder">
            {{ orders[0].value }}건
          </div>
        </div>
      </div>
    </div>

    <div class="px-3 pt-3 pb-6" style="border-bottom: solid 8px #f1f1f1">
      <div class="text-center" style="font-size: 0.875rem; font-weight: bolder; color: black">
        주문/배송 조회
      </div>
      <div class="align-center justify-center mt-3" style="display: flex">
        <div class="text-center" v-for="order of orders" :key="order.status" style="width: 18vw">
          <div>
            <v-avatar color="#f1f1f1" size="36" style="font-weight: bolder">{{
              order.value
            }}</v-avatar>
          </div>
          <div class="mt-1" style="font-size: 0.7rem; font-weight: bolder">{{ order.status }}</div>
        </div>
      </div>
    </div>
    <div class="px-3 pt-3 pb-6">
      <div class="text-center" style="font-size: 0.875rem; font-weight: bolder; color: black">
        바로가기
      </div>
      <div
        class="text-center mt-5 justify-center align-center"
        style="display: flex; font-size: 0.875rem; color: #6f6f6f"
      >
        <div style="width: 20vw" @click="movePage('cart')">
          <div>
            <v-icon :size="36">mdi-cart-check</v-icon>
          </div>
          <div>장바구니</div>
        </div>
        <div style="width: 20vw" @click="movePage('wishlist')">
          <div>
            <v-icon :size="36">mdi-account-heart-outline</v-icon>
          </div>
          <div>위시리스트</div>
        </div>
        <div style="width: 20vw" @click="movePage('orderlist')">
          <div>
            <v-icon :size="36">mdi-pencil-box-multiple-outline</v-icon>
          </div>
          <div>주문내역</div>
        </div>
        <div style="width: 20vw">
          <div>
            <v-icon :size="36">mdi-trophy-award</v-icon>
          </div>
          <div>회원혜택</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import member from "@/apis/member";
import apiOrder from "@/apis/order";

export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "MyPage",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      member: {
        mid: "mid",
        mrole: "ROLE_USER",
        mgrade: "Lv6",
        mpoint: 0,
      },
      coupon: {
        cid: "cid",
      },
      orders: [
        { status: "전체", value: 0 },
        { status: "결제", value: 0 },
        { status: "배송", value: 0 },
        { status: "배송완료", value: 0 },
        { status: "구매확정", value: 0 },
        { status: "구매취소", value: 0 },
      ],
      orderState: [],
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    movePage(page) {
      if (page === "wishlist") {
        this.$router.push("/member/wishlist").catch(() => {});
      } else if (page === "orderlist") {
        this.$router.push("/order/list").catch(() => {});
      } else if (page === "cart") {
        this.$router.push("/member/cart").catch(() => {});
      }
    },
    handleLogout() {
      this.$store.dispatch("login/deleteAuth");
      this.$router.push("/home/event");
    },
    //member 정보 획득
    async getMember() {
      try {
        const response = await member.getMember();
        this.member = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    //쿠폰 정보 획득
    getCoupon() {
      member
        .getCoupon()
        .then((response) => {
          this.coupon = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
      return;
    }
    this.$store.commit("gnb/setCurrentPage", "mypage");
    this.getMember();
    this.getCoupon();
    this.getOrderState();
  },
  mounted() {},
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

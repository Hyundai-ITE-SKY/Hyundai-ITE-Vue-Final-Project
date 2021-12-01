<!--컴포넌트 UI 정의-->
<template>
  <div>
    <div class="align-center pa-3" style="display: flex; border-bottom: solid 8px #f1f1f1">
      <div class="py-3 pr-3">
        <v-avatar :size="70">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" />
        </v-avatar>
      </div>
      <div>
        <div style="font-size: 1.5rem; font-weight: bolder">홍길동</div>
        <div>
          {{ member.mgrade }}
        </div>
      </div>
      <v-btn rounded text outlined color="#868686" elevation="0" class="ml-auto">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </div>
    <div class="align-center pa-3" style="display: flex">
      <div class="text-center">
        <v-icon :size="36" color="black">mdi-alpha-p-circle-outline</v-icon>
        <div style="font-size: 0.875rem; font-weight: bolder">포인트</div>
        <div class="mt-2" style="font-size: 1rem; font-weight: bolder">{{ member.mpoint.toLocaleString() }}P</div>
      </div>
      <div class="text-center">
        <v-icon :size="36" color="black">mdi-cash-multiple</v-icon>
        <div style="font-size: 0.875rem; font-weight: bolder">총 결제 금액</div>
        <div class="mt-2" style="font-size: 1rem; font-weight: bolder">{{ member.mpoint.toLocaleString() }}원</div>
      </div>
      <div class="text-center">
        <v-icon :size="36" color="black">mdi-ticket-percent-outline</v-icon>
        <div style="font-size: 0.875rem; font-weight: bolder">보유 쿠폰</div>
        <div class="mt-2" style="font-size: 1rem; font-weight: bolder">{{ member.mpoint.toLocaleString() }}원</div>
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
      ],
      orderState: [],
    };
  },
  //컴포넌트 메서드 정의
  methods: {
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

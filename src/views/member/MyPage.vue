<!--컴포넌트 UI 정의-->
<template>
  <div v-if="$store.state.userId !== ''">
    <div max-width="375" width="100%" style="margin-top: -6px">
      <v-img src="@/assets/images/background4.jpg" height="300px" dark>
        <v-row class="fill-height">
          <v-spacer></v-spacer>
          <!-- 사용자 이름과 등급 -->
          <v-card-title class="white--text pt-12">
            <span class="text-h5 pt-12">
              {{ member.mid }} 님의
              <br /><span class="text-h6">회원 등급은 {{ member.mgrade }} 입니다</span>
            </span>
          </v-card-title>
        </v-row>
      </v-img>

      <v-list two-line>
        <!-- 포인트 / 쿠폰 -->
        <v-list-item>
          <v-row no-gutters>
            <v-col cols="6">
              <v-card rounded="0" outlined>
                <v-card-title class="text-subtitle-1">포인트</v-card-title>
                <v-card-subtitle>{{ (member.mpoint).toLocaleString('ko-KR', 4) }}P</v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card rounded="0" outlined>
                <v-card-title class="text-subtitle-1">쿠폰</v-card-title>
                <v-card-subtitle>{{ coupon.length }} 개</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-list-item>

        <!-- 주문/배송 조회 -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">주문/배송 조회</v-list-item-title>
            <v-list-item-subtitle>
              <v-row class="d-flex align-center justify-center my-2">
                <v-col
                  cols="2"
                  class="d-flex flex-column align-center justify-center mx-1 pb-0"
                  v-for="(order, i) in orders"
                  :key="i * 2"
                >
                  <div v-if="order.value === 0" class="text-h5 grey--text">{{ order.value }}</div>
                  <div v-if="order.value !== 0" class="text-h5">{{ order.value }}</div>
                </v-col>
                <v-col
                  cols="2"
                  class="d-flex flex-column align-center justify-center mx-1 pt-0"
                  v-for="(order, i) in orders"
                  :key="i * 2 + 1"
                >
                  <div class="font-weight-black pl-2 text-body-2">{{ order.status }}</div>
                </v-col>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!--q&a, 개인정보 수정, 찜, 취소/반품-->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-card rounded="0" outlined to="/member/qna">
                    <v-card-title class="justify-center">
                      <v-icon>mdi-help-circle-outline</v-icon>
                    </v-card-title>
                    <v-card-subtitle class="text-center">Q&A</v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card rounded="0" outlined>
                    <v-card-title class="justify-center">
                      <v-icon>mdi-account-edit-outline</v-icon>
                    </v-card-title>
                    <v-card-subtitle class="text-center">개인정보 수정</v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card rounded="0" outlined to="/member/wishlist">
                    <v-card-title class="justify-center"
                      ><v-icon>mdi-heart-outline</v-icon></v-card-title
                    >
                    <v-card-subtitle class="text-center">찜</v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card rounded="0" outlined>
                    <v-card-title class="justify-center"><v-icon>mdi-archive-cancel-outline</v-icon></v-card-title>
                    <v-card-subtitle class="text-center">취소/반품</v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <div class="text-center">
          <v-btn @click="handleLogout" dark> 로그아웃 </v-btn>
        </div>
      </v-list>
    </div>
  </div>
</template>

<script>
import member from "@/apis/member"
import apiOrder from "@/apis/order"

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
      coupon:{
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
    async getMember(){
      try{
        const response = await member.getMember();
        this.member = response.data;
      }catch(err){
        console.log(err);
      }
    },
    //쿠폰 정보 획득
    getCoupon(){
      member.getCoupon()
        .then((response)=>{
          this.coupon = response.data;
        })
        .catch((error)=>{
          console.log(error);
        });
    },
    //주문 정보 획득
    async getOrderState(){
      await apiOrder.getOrderState(this.$store.getters["login/getUserId"])
                .then((response)=>{
                  this.orderState = response.data;
                  console.log(this.orderState);

                  for(let item of this.orderState){
                    console.log(item.ostatus);
                    console.log(item.count);
                    this.orders[item.ostatus].value = item.count;
                  }
                })
                .catch((error)=>{
                  console.log(error);
                });

    }
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
      return;
    }
    this.getMember();
    this.getCoupon();
    this.getOrderState();
  },
  mounted(){
    
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

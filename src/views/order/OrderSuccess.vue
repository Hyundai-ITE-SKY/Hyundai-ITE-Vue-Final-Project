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
          {{order.oreceiver}} | {{order.ozipcode}} {{order.oaddress1}}
        </div>
        <div class="ml-auto">
          <v-icon icon @click="showDelivery = !showDelivery">
            {{ showDelivery ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </div>
      </div>
      <v-expand-transition>
        <div v-show="showDelivery" style="margin-left: 90px" class="mb-2">
          <v-divider></v-divider>
          <v-card-text class="pa-0" style="color: #5d5d5d">
            {{order.otel}}<br />
            {{order.oaddress1}}<br />
            {{order.oaddress2}}
          </v-card-text>
        </div>
      </v-expand-transition>

      <!--주문완료 상품 정보-->
      <div class="d-flex mb-3">
        <div style="width: 90px; font-weight: bold">상품 정보</div>
        <div v-for="itemName of orderItems" :key="itemName.pid" class="d-inline-block text-truncate" style="max-width: 200px">
          <span v-if="productsInfo.find((x) => x.pid === itemName.pid) !== undefined">
            {{productsInfo.find((x) => x.pid === itemName.pid).pname}}
          </span>
        </div>
        <div class="ml-auto">
          <v-icon icon @click="showProduct = !showProduct">
            {{ showProduct ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </div>
      </div>
      <!--밑으로 클릭하면 나오는 부분-->
      <v-expand-transition>
        <div v-for="item of orderItems" v-bind:key="item.pid" v-show="showProduct" >
          <div class="d-flex justify-center" v-if="productsInfo.find((x) => x.pid === item.pid) !== undefined">
            <div class="pa-1 d-flex align-center mb-2">
              <div style="width: 60px">
                <v-img
                  :src="`${productsInfo.find((x) => x.pid === item.pid).cimage1}`"
                  height="100%"
                ></v-img>
              </div>
              <v-card-text style="font-size: 11px; width: 60%" class="pa-0 pl-2"
                >{{ productsInfo.find((x) => x.pid === item.pid).bname }}<br />
                {{ productsInfo.find((x) => x.pid === item.pid).pname }}<br />
                <v-card-subtitle style="font-size: 10px; color: grey" class="pa-0"
                  >옵션 : {{ item.pcolor }} / {{ item.psize }}<br />
                  수량 {{ item.pamount }}개</v-card-subtitle>
              </v-card-text>
              <div class="d-flex align-center" style="width: 100px">
                <span class="mx-auto">
                      {{
                        ((productsInfo.find((x) => x.pid === item.pid).pprice * item.pamount * (100 - sales)) / 100).toLocaleString()
                      }}원</span>
              </div>
            </div>
          </div>
        </div>
        
      </v-expand-transition>

      <div class="d-flex mb-3">
        <div style="width: 90px; font-weight: bold">결제금액</div>
        <div>{{order.ototal}}원</div>
      </div>

      <div class="d-flex mb-3">
        <div style="width: 90px; font-weight: bold">결제정보</div>
        <div v-if="order.opayment==0">신용카드 결제</div>
        <div v-if="order.opayment==1">가상계좌 결제</div>
      </div>
    </div>
    <v-card-actions class="justify-center">
      <v-btn outlined to="/order/list">주문내역 조회</v-btn>
      <v-btn color="black" dark to="/">홈으로 가기</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import apiMember from '@/apis/member';
import apiProduct from '@/apis/product';

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
      order:{},
      orderItems:[],
      member: { mpoint: 1000000 },
      productsInfo: [
        {
          bname: "the CASHMERE",
          cimage1:
            "http://newmedia.thehandsome.com/CM/2B/SS/CM2B4WPC586WP1_CB_W01.jpg/dims/resize/684x1032/",
          pid: "CM2B4WPC586WP1",
          pname: "백 밴딩 스트레이트 팬츠",
          pprice: 0,
        },
      ],
      sales: this.$store.getters["product/getGradeSale"],
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    getMember() {
      apiMember
        .getMember()
        .then((response) => {
          this.member = response.data;
          this.order.oreceiver = this.member.mname;
          this.order.otel = this.member.mtel;
          this.order.ozipcode = this.member.mzipcode;
          this.order.oaddress1 = this.member.maddress1;
          this.order.oaddress2 = this.member.maddress2;
          this.order.mid = this.member.mid;
          this.originMpoint = this.member.mpoint;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProductInfo() {
      this.productsInfo = [];
      for (let item of this.orderItems) {
        apiProduct
          .getProductInfo(item.pid, item.pcolor)
          .then((res) => {
            this.productsInfo.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    this.$store.commit("gnb/setCurrentPage", "ordersuccess");
    this.order = this.$store.getters["order/getOrder"];
    this.orderItems = this.$store.getters["order/getOrderItems"];
    this.getMember();
    this.getProductInfo();
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

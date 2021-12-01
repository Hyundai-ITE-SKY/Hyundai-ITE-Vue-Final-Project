<!--컴포넌트 UI 정의-->
<template>
  <div>
    <v-card class="mx-auto mt-5 mb-5" outlined>
      <div class="d-flex justify-space-between">
        <h4 class="pa-0 pl-3 pt-3 pb-3">주문자 정보</h4>
        <span class="px-3 pt-3" style="font-size: 14px">
          {{ member.mname }} &nbsp;|&nbsp; {{ member.mtel }}
        </span>
      </div>
    </v-card>

    <v-card class="mx-auto mb-5" outlined>
      <div class="d-flex justify-space-between align-center">
        <h4 class="px-3 py-3">배송지</h4>
        <span class="py-3 px-3">
          <delivery-component
            :oreceiver="member.mname"
            :otel="member.mtel"
            @HandleDelivery="SetDelivery"
          ></delivery-component>
          <v-icon class="" @click="showDelivery = !showDelivery">
            {{ showDelivery ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon
          >
        </span>
      </div>
      <v-expand-transition>
        <div v-show="showDelivery">
          <v-divider></v-divider>
          <v-card-text class="font-weight-black text-subtitle-2">
            수령인 &nbsp; {{ order.oreceiver }} <br />
            번호 &nbsp; {{ order.otel }}<br />
            우편번호 &nbsp; {{ order.ozipcode }} <br />
            주소 &nbsp; {{ order.oaddress1 }} {{ order.oaddress2 }}<br />
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <v-card class="mx-auto mb-5" outlined>
      <div class="d-flex justify-space-between pa-3">
        <h4>상품 정보</h4>
        <v-icon @click="showProduct = !showProduct">
          {{ showProduct ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon
        >
      </div>
      <v-expand-transition>
        <div v-show="showProduct">
          <v-divider></v-divider>
          <template v-for="item of orderItems">
            <div
              class="pa-1 d-flex justify-center align-center"
              v-if="productsInfo.find((x) => x.pid === item.pid) !== undefined"
              :key="item.pid"
            >
              <div style="width: 65px">
                <v-img
                  :src="`${productsInfo.find((x) => x.pid === item.pid).cimage1}`"
                  height="100%"
                >
                </v-img>
              </div>
              <v-card-text
                style="font-size: 11px; width: 55%; whitespace: nowrap"
                class="pa-0 pl-2 font-weight-bold text-subtitle-2"
              >
                {{ productsInfo.find((x) => x.pid === item.pid).bname }}<br />
                {{ productsInfo.find((x) => x.pid === item.pid).pname }}<br />
                <v-card-subtitle
                  style="font-size: 10px; color: grey; whitespace: nowrap"
                  class="pa-0 font-weight-bold text-subtitle-2"
                >
                  옵션 : {{ item.pcolor }} / {{ item.psize }}<br />
                  수량 {{ item.pamount }}개</v-card-subtitle
                >
              </v-card-text>
              <div class="d-flex flex-column justify-center">
                <div class="font-weight-bold text-subtitle-2">
                  {{
                    (
                      (productsInfo.find((x) => x.pid === item.pid).pprice * (100 - sales)) /
                      100
                    ).toLocaleString()
                  }}
                  원
                </div>
                <div class="text-decoration-line-through text-subtitle-2 grey--text">
                  {{ productsInfo.find((x) => x.pid === item.pid).pprice.toLocaleString() }}원
                </div>
                <div class="text-subtitle-2" style="font-weight: bolder; color: #eb7c4c">
                  {{ sales }}% 할인
                </div>
              </div>
            </div>
          </template>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card class="mx-auto mb-5" outlined>
      <div class="d-flex justify-space-between pa-3">
        <h4>쿠폰/할인/적립금</h4>
        <v-icon @click="showDiscount = !showDiscount">
          {{ showDiscount ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </div>
      <v-expand-transition>
        <div v-show="showDiscount">
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters class="d-flex justify-space-between align-center">
              <v-col cols="8" class="mb-3">
                <div class="text-subtitle-1 font-weight-black">
                  쿠폰 전체 {{ coupons.length }}장 &nbsp;
                </div>
                <div class="text-subtitle-2 font-weight-black" v-if="isUsedCoupon">
                  {{ coupons.cname }} | 쿠폰 코드
                  <span style="color: #eb7c4c"> {{ order.ousedcoupon }} </span>
                </div>
              </v-col>
              <v-col cols="3">
                <coupon-component
                  :coupons="coupons"
                  @HandleCoupon="SetUseCoupon"
                ></coupon-component>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters class="d-flex justify-space-between align-center">
              <v-col cols="12">
                <v-text-field
                  label="포인트"
                  type="number"
                  v-model="order.ousedmileage"
                  :disabled="isPointInput"
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="text-subtitle-2 font-weight-black">
                잔여 포인트 &nbsp; {{ member.mpoint.toLocaleString() }} P <br />
                적립금 1,000
              </v-col>
              <v-col cols="6" class="d-flex flex-row-reverse">
                <v-btn v-if="isApplyPoint" dark class="px-2" @click="applyPoint">적용</v-btn>
                <v-btn v-if="!isApplyPoint" dark class="px-2" @click="applyPoint">적용 취소</v-btn>
                <v-btn dark class="px-2 mr-1" @click="useAllPoint" :disabled="isUsePointAll"
                  >모두 사용</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card class="mx-auto mb-5" outlined>
      <div class="d-flex justify-space-between pa-3">
        <h4>결제 정보</h4>
        <v-icon @click="showPayment = !showPayment">
          {{ showPayment ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </div>
      <v-expand-transition>
        <div v-show="showPayment">
          <v-divider></v-divider>
          <div class="d-flex justify-space-around pt-3">
            <v-btn
              class="ma-0"
              outlined
              :color="cardColor"
              width="45%"
              height="40"
              @click="paymentClick('card')"
            >
              신용카드
            </v-btn>
            <v-btn
              class="ma-0"
              outlined
              :color="accountColor"
              width="45%"
              height="40"
              @click="paymentClick('account')"
            >
              가상계좌
            </v-btn>
          </div>
          <v-col v-if="isCard" class="d-flex" cols="12" sm="6">
            <v-select
              v-model="selectCard"
              :items="cards"
              label="카드를 선택하세요"
              dense
              solo
              color="indigo darken-3"
              item-color="indigo darken-3"
            ></v-select>
          </v-col>
          <v-col v-if="isAccount" class="d-flex" cols="12" sm="6">
            <v-select
              v-model="selectAccount"
              :items="accounts"
              label="계좌를 선택하세요"
              dense
              solo
              color="indigo darken-3"
              item-color="indigo darken-3"
            ></v-select>
          </v-col>
        </div>
      </v-expand-transition>
    </v-card>

    <v-card class="mx-auto mb-5" outlined>
      <div class="d-flex justify-space-between align-center">
        <h3 class="px-3 py-3">결제 금액</h3>
        <h3 class="blue--text px-3 py-3">{{ atotalPrice.toLocaleString() }} 원</h3>
      </div>

      <v-divider></v-divider>
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <span class="text-subtitle-1 font-weight-black">총 상품 금액</span>
          <span class="text-subtitle-1 font-weight-black"
            >{{ btotalPrice.toLocaleString() }} 원</span
          >
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-subtitle-1 font-weight-black">할인 금액</span>
          <span class="text-subtitle-1 font-weight-black" style="color: #eb7c4c"
            >- {{ discountPrice.toLocaleString() }} 원</span
          >
        </div>
      </v-card-text>
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
      isUsedCoupon: false,
      originMpoint: null,
      isUsePointAll: false,
      isPointInput: false,
      isApplyPoint: true,
      isCard: true,
      isAccount: false,
      selectCard: "현대카드",
      selectAccount: "현대은행",
      accountColor: "grey",
      cardColor: "indigo",
      cards: ["현대카드", "신한카드", "우리카드", "롯데카드", "삼성카드", "기업카드"],
      accounts: ["현대은행", "국민은행", "농협", "신한은행", "기업은행", "카카오뱅크", "우리은행"],
      member: { mpoint: 1000000 }, //사용자 정보
      orderItems: [{ mid: "", pcolor: "", pamount: 0, pid: "", psize: "" }], //주문 제품 정보들
      order: {
        mid: "",
        oaccountdeadline: "",
        oaddress1: "",
        oaddress2: "",
        odate: "",
        odiscounted: 0,
        oid: "",
        opayment: 0,
        oreceiver: "",
        ostatus: 0,
        otel: "",
        ousedcoupon: 0,
        ousedmileage: 0,
        ozipcode: 0,
        ototal: 0,
      },
      orderList: [
        {
          mid: "",
          oaccountdeadline: "",
          oaddress1: "",
          oaddress2: "",
          odate: "",
          odiscounted: 0,
          oid: "",
          opayment: 0,
          oreceiver: "",
          ostatus: 0,
          otel: "",
          ousedcoupon: 0,
          ousedmileage: 0,
          ozipcode: 0,
          ototal: 0,
        },
      ],
      oid: null,
      productsInfo: [
        {
          bname: "the CASHMERE",
          cimage1:
            "http://newmedia.thehandsome.com/CM/2B/SS/CM2B4WPC586WP1_CB_W01.jpg/dims/resize/684x1032/",
          pid: "CM2B4WPC586WP1",
          pname: "백 밴딩 스트레이트 팬츠",
          pprice: 0,
        },
      ], //주문한 제품들의 상세 정보
      coupons: [
        {
          ccode: "110",
          cenddate: "0021-11-27",
          cname: "30% 세일 쿠폰",
          cstartdate: "2021-11-30",
          cstate: 0,
          eid: 1,
          mid: "mid1",
        },
      ],
      atotalPrice: 0,
      btotalPrice: 0,
      discountPrice: 0,
      sales: this.$store.getters["product/getGradeSale"],
      testArr: [{ value: 1 }, 2, 3],
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
          console.log("member : ", response.data);
          console.log("orderMember : ", this.order);
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
      this.productsInfo = [];
      for (let item of this.orderItems) {
        apiProduct
          .getProductInfo(item.pid, item.pcolor)
          .then((res) => {
            this.productsInfo.push(res.data);
            console.log("for문 안", res);
            //price 초기 세팅
            this.initPrice();
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
          this.coupons = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //price 초기 세팅
    initPrice() {
      this.atotalPrice = 0;
      this.btotalPrice = 0;
      this.discountPrice = 0;

      for (let info of this.productsInfo) {
        let amount = this.orderItems.find((x) => x.pid === info.pid).pamount;
        this.btotalPrice += info.pprice * amount;
        this.atotalPrice += ((info.pprice * (100 - this.sales)) / 100) * amount;
      }
      this.discountPrice = this.btotalPrice - this.atotalPrice;
    },
    //배송지 주소 변경사항 받아오기
    SetDelivery(newDelivery) {
      console.log(newDelivery);
      this.order.oreceiver = newDelivery.receiver;
      this.order.otel = newDelivery.tel;
      this.order.ozipcode = newDelivery.zipcode;
      this.order.oaddress1 = newDelivery.address1;
      this.order.oaddress2 = newDelivery.address2;
      console.log(this.order);
    },
    SetUseCoupon(cid, cname) {
      if (cid != 1) {
        if (!this.isUsedCoupon) {
          //30프로 할인 가격 세팅
          this.atotalPrice = this.atotalPrice * 0.7;
          this.discountPrice = this.btotalPrice - this.atotalPrice;
        }
        //CouponComponent의 cid, cname 값 받기
        this.order.ousedcoupon = cid;
        this.coupons.cname = cname;
        this.isUsedCoupon = true;
      } else {
        this.order.ousedcoupon = "";
        this.coupons.cname = "";
        this.isUsedCoupon = false;
        this.initPrice();
      }
    },
    useAllPoint() {
      console.log(this.atotalPrice);
      console.log(this.originMpoint);
      if (parseInt(this.atotalPrice) < parseInt(this.originMpoint)) {
        this.order.ousedmileage = this.atotalPrice;
        this.member.mpoint = this.originMpoint - this.atotalPrice;
      } else {
        this.order.ousedmileage = this.originMpoint;
        this.member.mpoint = 0;
      }
    },
    applyPoint() {
      //유효성 검사
      /*if(typeof(this.order.ousedmileage) !== 'number'){
        console.log(typeof(this.order.ousedmileage));
      }else{
        console.log("숫자입니다.");
      }*/

      if (this.isApplyPoint) {
        //포인트 적용
        this.isApplyPoint = false;
        this.isUsePointAll = true;
        this.isPointInput = true;

        this.atotalPrice -= parseInt(this.order.ousedmileage);
        this.discountPrice += parseInt(this.order.ousedmileage);
        return;
      } else {
        this.isApplyPoint = true;
        this.isUsePointAll = false;
        this.isPointInput = false;

        this.atotalPrice += parseInt(this.order.ousedmileage);
        this.discountPrice -= parseInt(this.order.ousedmileage);
        return;
      }
    },
    paymentClick(paymentMethod) {
      console.log(paymentMethod);
      if (paymentMethod === "card") {
        this.isCard = true;
        this.isAccount = false;
        this.cardColor = "indigo";
        this.accountColor = "grey";
        this.order.opayment = 0;
      } else if (paymentMethod === "account") {
        this.isCard = false;
        this.isAccount = true;
        this.cardColor = "grey";
        this.accountColor = "indigo";
        this.order.opayment = 1;
      }
    },
    async getOrderListByMid() {
      await apiOrder
        .getOrderList()
        .then((response) => {
          console.log("getOrderListByMid", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async CartitemDelete(pid, pcolor, psize) {
      await apiMember
        .deleteCartitem(pid, pcolor, psize)
        .then(() => {
          location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateCoupon(ccode, cstate) {
      await apiMember
        .updateCoupon(ccode, cstate)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updatePoint(point) {
      await apiMember
        .updatePoint(point)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async orderSuccess() {
      /* orderList 삽입 데이터 세팅 */
      this.order.odiscounted = this.discountPrice;
      this.order.odate = new Date();
      this.order.oid = "oid1"; //서버에서 Sequence로 들어감
      let yy = this.order.odate.getFullYear().toString().substring(2, 4);
      let MM = this.order.odate.getMonth();
      let dd = this.order.odate.getDate();
      let hh = this.order.odate.getHours();
      let mm = this.order.odate.getMinutes();
      let ss = this.order.odate.getSeconds();
      this.order.odate = `${yy}/${MM}/${dd} ${hh}:${mm}:${ss}`; //서버에서 Sysdate로 들어감
      this.order.oaccountdeadline = `${yy}/${MM}/${dd} ${hh}:${mm}:${ss}`; //서버에서 Sysdate+2로 들어감

      const orderList = new FormData();
      orderList.append("mid", this.order.mid);
      orderList.append("oaccountdeadline", this.order.oaccountdeadline);
      orderList.append("oaddress1", this.order.oaddress1);
      orderList.append("oaddress2", this.order.oaddress2);
      orderList.append("odate", this.order.odate);
      orderList.append("odiscounted", this.order.odiscounted);
      orderList.append("oid", this.order.oid);
      orderList.append("opayment", this.order.opayment);
      orderList.append("oreceiver", this.order.oreceiver);
      orderList.append("ostatus", 1);
      orderList.append("otel", this.order.otel);
      orderList.append("ousedcoupon", this.order.ousedcoupon);
      orderList.append("ousedmileage", this.order.ousedmileage);
      orderList.append("ozipcode", this.order.ozipcode);
      orderList.append("ototal", this.atotalPrice);

      await apiOrder
        .createOrderList(orderList)
        .then((response) => {
          console.log(response.data);
          //oid 가져오기
          let oid = response.data.oid;
          /* orderItems 삽입 데이터 세팅 */
          for (let item of this.orderItems) {
            const orderItem = new FormData();
            orderItem.append("oid", oid);
            orderItem.append("pid", item.pid);
            orderItem.append("ccolorcode", item.pcolor);
            orderItem.append("psize", item.psize);
            orderItem.append("oamount", item.pamount);

            //orderItem에 데이터 삽입
            apiOrder
              .createOrderItem(orderItem)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });

            this.CartitemDelete(item.pid, item.pcolor, item.psize);

            if (this.isUsedCoupon) {
              //쿠폰 업데이트
              console.log("coupon update");
              this.updateCoupon(this.order.ousedcoupon, 1);
            }
            if (!this.isApplyPoint) {
              //마일리지 업데이트
              console.log("mpoint update");
              this.updatePoint(this.member.mpoint);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.orderItems.splice(0, 1, ...this.$store.getters["cart/getProductToBuy"]);
    this.$store.commit("gnb/setCurrentPage", "order");
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
      return;
    }
    this.getMember();
    this.getCoupon();
    this.isUsedCoupon = false;
    //oid 받기
    //this.oid = this.$route.query.oid; //이거 지워야해
    //this.getOrderListItem(); //이거 지워야해
    this.getProductInfo();
  },
  watch: {
    "order.ousedmileage"(newValue) {
      //console.log(newValue);
      //console.log(this.order.ousedmileage);

      if (this.originMpoint < newValue) {
        this.order.ousedmileage = this.originMpoint;
        this.member.mpoint = 0;
      } else if (newValue < 0) {
        this.order.ousedmileage = 0;
        this.member.mpoint = this.originMpoint;
      } else if (newValue > this.atotalPrice) {
        this.order.ousedmileage = this.atotalPrice;
        this.member.mpoint = this.originMpoint - this.atotalPrice;
      } else {
        this.order.ousedmileage = newValue;
        this.member.mpoint = this.originMpoint - newValue;
      }
    },
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

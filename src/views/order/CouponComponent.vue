<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" class="px-2" width="100%"> 쿠폰 선택 </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">쿠폰 선택</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-radio-group v-model="radioGroup">
            <div class="mb-2" v-for="(coupon, n) of coupons" :key="n">
              <v-radio :label="`쿠폰 코드 ${coupon.ccode}`" :value="coupon.ccode"> </v-radio>
              <v-img
                class="d-flex align-center"
                src="https://user-images.githubusercontent.com/55488114/143914098-30632c18-226c-4dc2-957b-be0a5e3750c8.png"
              >
                <div
                  style="padding-left: 90px; font-weight: bold"
                  class="align-right text-subtitle-2"
                >
                  {{ coupon.cname }}<br />
                  {{ new Date(coupon.cstartdate).toLocaleDateString() }} -
                  {{ new Date(coupon.cenddate).toLocaleDateString() }}
                </div>
              </v-img>
            </div>
          </v-radio-group>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="saveCoupon(false)"> Remove </v-btn>
        <v-btn color="blue darken-1" text @click="saveCoupon(true)"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "CouponComponent",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      dialog: false,
      zipcode: "",
      address1: "",
      address2: "",
      radioGroup: 1,
    };
  },
  //컴포넌트 메서드터 정의
  methods: {
    execDaumPostcode() {},
    saveCoupon(state) {
      if (state) {//save 클릭시
        if (this.radioGroup != 1) {
          //radioGroup은 ccode 반환
          let cname = this.coupons.find((x) => x.ccode === this.radioGroup).cname;
          this.$emit("HandleCoupon", this.radioGroup, cname);
        }
      }else{//remove 클릭시
        this.$emit("HandleCoupon", 1, "");
      }

      this.dialog = false;
    },
  },
  props: {
    coupons: Array,
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

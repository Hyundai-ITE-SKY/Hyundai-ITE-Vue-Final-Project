<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" class="px-2"> 쿠폰 선택 </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">쿠폰 선택</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-radio-group v-model="radioGroup">
            <v-radio v-for="n in 1" :key="n" :label="`Radio ${n}`" :value="n">
            </v-radio>
          </v-radio-group>
          <v-img
            class="d-flex align-center"
            src="https://user-images.githubusercontent.com/55488114/143914098-30632c18-226c-4dc2-957b-be0a5e3750c8.png"
          >
            <div style="padding-left: 100px; font-weight: bold" class="align-right">
              쿠폰 이름<br />
              시작일 - 종료일
            </div>
          </v-img>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      dialog: false,
      zipcode: "",
      address1: "",
      address2: "",
    };
  },
  //컴포넌트 메서드터 정의
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address1 = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address1 = data.jibunAddress;
          }
          // 우편번호를 입력한다.
          this.zipcode = data.zonecode;
        },
      }).open();
    },
  },
  created() {
    console.log(this.coupon);
  },
  props: {
    coupon: Object,
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on"> 배송지 변경 </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">배송지 선택</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters class="d-flex justify-center align-center">
              <!-- 수령인/연락처 -->
              <v-col cols="6">
                <v-text-field
                  label="수령인"
                  :counter="10"
                  v-model="delivery.receiver"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="ml-4">
                <v-btn v-show="isReceiver" dark @click="getMemberInfo('same')">사용자와 동일</v-btn>
                <v-btn v-show="!isReceiver" dark @click="getMemberInfo('remove')">사용자 정보 제거</v-btn>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="수령인 연락처"
                  v-model="delivery.tel"
                  :rules="telRules"
                  :counter="13"
                  placeholder="010-1234-5678"
                ></v-text-field>
              </v-col>
              <!-- 주소 -->
              <v-col cols="6">
                <v-text-field
                  label="우편번호"
                  v-model="delivery.zipcode"
                  :rules="notNullRules"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="ml-4">
                <v-btn dark @click="execDaumPostcode()">우편번호 찾기</v-btn>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="주소"
                  v-model="delivery.address1"
                  :rules="notNullRules"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="상세주소" v-model="delivery.address2"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="saveDelivery"> Save </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = !snackbar"> Close </v-btn>
      </template>
    </v-snackbar>
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
      valid: true,
      dialog: false,
      isReceiver: true,
      delivery: {
        receiver: "",
        tel: "",
        zipcode: "",
        address1: "",
        address2: "",
      },
      nameRules: [
        (v) => !!v || "수령인은 필수값입니다.",
        (v) => (v && v.length <= 10) || "수령인은 10자 이하로 작성해주세요.",
        (v) => !/[~!@#$%^&*()_+|<>?:{}/]/.test(v) || "특수문자는 입력할 수 없습니다.",
      ],
      telRules: [
        (v) => !!v || "전화번호는 필수값입니다.",
        (v) => /(\d{3})-(\d{4})-(\d{4})/.test(v) || "전화번호 형식이 올바르지 않습니다.",
      ],
      notNullRules: [(v) => !!v || "주소는 필수값입니다."],
      snackbarText: "",
      snackbar: false,
    };
  },
  //컴포넌트 메서드터 정의
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.delivery.address1 = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.delivery.address1 = data.jibunAddress;
          }
          // 우편번호를 입력한다.
          this.delivery.zipcode = data.zonecode;
        },
      }).open();
    },
    getMemberInfo(state) {
      if (state === "same") {
        this.delivery.receiver = this.oreceiver;
        this.delivery.tel = this.otel;
        this.isReceiver = !this.isReceiver;
      } else if (state === "remove") {
        this.delivery.receiver = "";
        this.delivery.tel = "";
        this.isReceiver = !this.isReceiver;
      }
    },
    saveDelivery() {
      //빈칸이 존재하지 않을 경우 실행
      console.log("saveDelivery", this.delivery.receiver);
      let del = this.delivery;
      if (del.receiver === "" || del.tel === "" || del.address1 === "" || del.zipcode === "") {
        console.log("빈칸이 존재");
        this.snackbarText = "입력값이 올바르지 않습니다.";
        this.snackbar = true;
      } else {
        this.$refs.form.resetValidation();
        this.dialog = false;
        console.log("saveDelivery");
        this.$emit("HandleDelivery", this.delivery);
      }
    },
  },
  created() {
    this.snackbar = false;
  },
  props: ["oreceiver", "otel"],
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

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
          <v-row no-gutters class="d-flex justify-center align-center">
            <!-- 수령인/연락처 -->
            <v-col cols="6">
              <v-text-field label="수령인" required></v-text-field>
            </v-col>
            <v-col cols="5" class="ml-4">
              <v-btn dark>사용자와 동일</v-btn>
            </v-col>
            <v-col cols="12">
              <v-text-field label="수령인 연락처"></v-text-field>
            </v-col>

            <!-- 주소 -->
            <v-col cols="6">
              <v-text-field label="우편번호" v-model="zipcode"></v-text-field>
            </v-col>
            <v-col cols="5" class="ml-4">
              <v-btn dark @click="execDaumPostcode()">우편번호 찾기</v-btn>
            </v-col>
            <v-col cols="12">
              <v-text-field label="주소" v-model="address1"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="상세주소" v-model="address2"></v-text-field>
            </v-col>
          </v-row>
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
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

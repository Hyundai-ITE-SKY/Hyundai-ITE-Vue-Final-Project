<!--컴포넌트 UI 정의-->
<template>
  <div>
    <div>
      <v-divider></v-divider>
      <div class="white d-flex ma-0 pa-0 mb-2 mt-5">
        <v-row class="ma-0">
          <v-col cols="1">
            <v-checkbox color="black" v-model="selected" :value="checkboxValue"></v-checkbox>
          </v-col>
          <v-col cols="3" class="pa-0 pl-3">
            <div style="width: 80px">
              <v-img :src="cimage1" contain />
            </div>
          </v-col>
          <v-col class="ml-2">
            <v-row>
              <v-col cols="9" class="pa-0 font-weight-black text-truncate" style="font-size: 15px"
                >{{ bname }}
              </v-col>
              <v-col cols="1" class="mr-2 pa-0">
                <div class="ml-auto" @click="state = !state">
                  <v-icon v-if="!state">mdi-heart-outline</v-icon>
                  <v-icon v-if="state" style="color: red">mdi-heart</v-icon>
                </div>
              </v-col>
              <v-col cols="1" class="pa-0 pr-1"><v-icon>mdi-close</v-icon></v-col>
              <v-col cols="12" class="pa-0 text-truncate" style="font-size: 15px">
                {{ pname }}
              </v-col>
              <v-col cols="12" class="pa-0" style="font-size: 14px; color: grey"
                >옵션 : {{ pcolor }}_{{ psize }}</v-col
              >
              <v-col cols="12" class="pa-0" style="font-size: 14px; color: grey"
                >수량 : {{ pamount }} 개</v-col
              >
              <v-col cols="12" class="font-weight-black ma-0 pt-2"
                >{{ (pprice * pamount).toLocaleString() }} 원</v-col
              >
            </v-row>
          </v-col>

          <v-layout class="justify-center">
            <v-card-actions class="mb-3 mt-3 pt-0">
              <v-btn dark class="mr-3" outlined color="black">옵션/수량</v-btn>
              <v-btn dark to="/order/order" outlined color="black">바로 구매</v-btn>
            </v-card-actions>
          </v-layout>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "CartItem",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      state: false,
    };
  },
  //컴포넌트 메서드 정의
  methods: {},
  props: {
    cimage1: String,
    bname: String,
    pname: String,
    pcolor: String,
    psize: String,
    pamount: Number,
    pprice: Number,
    selected : Boolean,
    checkboxValue : String
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

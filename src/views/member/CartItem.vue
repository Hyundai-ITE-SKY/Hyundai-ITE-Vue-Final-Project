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
                <div class="ml-auto" @click="handleWish(pid)">
                  <v-icon v-if="!state">mdi-heart-outline</v-icon>
                  <v-icon v-if="state" style="color: red">mdi-heart</v-icon>
                </div>
              </v-col>
              <v-col cols="1" class="pa-0 pr-1"><v-icon @click="handleDelete(pid, pcolor, psize)">mdi-close</v-icon></v-col>
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
              <v-btn dark class="mr-3" outlined color="black" @click="show = !show">
                옵션/수량
                <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </v-btn>
              <v-btn dark to="/order/order" outlined color="black">바로 구매</v-btn>
            </v-card-actions>
          </v-layout>
        </v-row>
      </div>
      <v-expand-transition>
        <div v-show="show">
          <div style="border: 1px solid" class="ml-1 mr-1 mb-3">
            <div class="ma-6">
              <v-select :items="colorList" label="COLOR 선택" dense solo outlined></v-select>
              <v-select :items="items" label="SIZE 선택" dense solo outlined></v-select>
              <v-select :items="items" label="수량 선택" dense solo outlined></v-select>
              <div class="justify-center">
                <v-btn>취소</v-btn>
                <v-btn>변경사항 저장</v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-expand-transition>
    </div>
  </div>
</template>

<script>
// import apiProduct from "@/apis/product";

export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "CartItem",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      state: false,
      show: false,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      colorList : [],
      checked : false,
      
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    handleWish(pid){
      this.state = !this.state;
      //좋아요 클릭 시 cartItemHandleWish이벤트 발생( 자식 -> 부모 )
      this.$emit("cartItemHandleWish", this.state, pid);
    },
    handleDelete(pid, pcolor, psize){
      // console.log(pid, pcolor, psize);
      this.$emit("cartItemHandleDelete", pid, pcolor, psize);
    }
  },
  props: {
    pid: String,
    cimage1: String,
    bname: String,
    pname: String,
    pcolor: String,
    psize: String,
    pamount: Number,
    pprice: Number,
    pcolorList : Array,
    checkboxValue: Number,
    isWish: Boolean,
  },
  created() {
    this.state = this.isWish;
    // console.log('확인햐 : ',this.pcolorList);
  },
  computed : {
    selected : {
      get(){
        return this.checked;
      },
      set: function(newValue){
        this.$emit('updateSelected', this.checkboxValue, newValue);
      }
    }
  }
  ,
  watch : {
    pcolorList : function(){
      console.log('####### 여기는 cartitem : ',this.pcolorList);
      for(var p of this.pcolorList){
        this.colorList.push(p.ccolorcode);
      }
    }
  }
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

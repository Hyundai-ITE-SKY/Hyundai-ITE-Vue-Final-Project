<!-- 컴포넌트 UI 정의 -->
<template>
  <div>
    <v-row dense class="text-center ma-0 pa-0 justify-center align-center">
      <v-col cols="auto" class="" style="white-space: nowrap">
        <v-icon color="red">mdi-cards-heart</v-icon>
      </v-col>
      <v-col cols="auto" class="">
        <span class="text-h6 font-weight-black">WISH LIST</span>
      </v-col>
      <v-col cols="auto" class="text-h6 font-weight-black">
        <span>2</span>
      </v-col>
    </v-row>

    <v-row class="justify-center ma-0 pa-0">
      <v-col cols="6" class="" v-for="product in productIds" :key="product.pid">
        <v-img src="@/assets/images/wishlist-sample1.jpg" contain />
        <v-row>
          <v-col cols="9" class="font-weight-black pb-0"> 브랜드명 </v-col>
          <v-col cols="3" align-self="end" class="pb-0 pt-0">
            <v-icon color="red">mdi-cards-heart</v-icon>
          </v-col>
          <v-col cols="9" class="font-weight-black pb-0 pt-0"> 제품명 {{ product.pid }} </v-col>
          <v-col cols="9" class="font-weight-black pt-0"> 100,000 </v-col>
        </v-row>
        <v-col cols="12" class="ma-0 pa-0 text-center">
          <v-btn class="black white--text font-weight-black" to="/product/detail">상세보기</v-btn>
        </v-col>
      </v-col>
      <v-col cols="6" class=""> </v-col>
    </v-row>
  </div>
</template>

<script>
import member from "@/apis/member";
import product from "@/apis/product";

export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "WishList",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return {
      productIds: null, //{ mid:..., pid:... }
      products: [], //{ { product1 }, { product1 } }
    };
  },
  // 컴포넌트 메소드 정의
  methods: {
    //boardlist 사용하기
    getWishList() {
      member
        .getWishList(this.$store.state.userId)
        .then((response) => {
          this.productIds = response.data;
          //console.log(this.productIds);
          this.getProduct();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* 장바구니의 product들을 가져온다. */
    getProduct() {
      for (var item in this.productIds) {
        console.log(this.productIds[item].pid);

        product
          .getProduct(this.productIds[item].pid)
          .then((response) => {
            //console.log(response.data);
            this.products.push(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      console.log(this.products);
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.getWishList();
  },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

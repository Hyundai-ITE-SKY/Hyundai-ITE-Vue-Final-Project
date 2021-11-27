<!-- 컴포넌트 UI 정의 -->
<template>
  <div>
    <v-row no-gutters>
      <v-col align-self="auto" v-for="product in products" :key="product.pno" cols="6">
        <div class>
          <product-item
            :bname="product.bname"
            :pname="product.pname"
            :pprice="product.pprice"
            :colors="product.colors"
            :isWish="true"
            :pid="item.pid"
          ></product-item>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import product from "@/apis/product";
import ProductItem from "@/views/product/ProductItem.vue";

export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "WishList",
  // 추가하고 싶은 컴포넌트를 등록
  components: {
    ProductItem,
  },
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
      this.productIds = this.$store.getters["product/getUserWishList"];
      this.getProduct();
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

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
            :pid="product.pid"
            @productItemHandleWish="WishCreateDelete"
          ></product-item>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import apiProduct from "@/apis/product";
import ProductItem from "@/views/product/ProductItem.vue";
import apiMember from "@/apis/member";

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
    /* wishlist 받아오기 */
    async getWishList() {
      const wishlist = await apiMember.getWishList();
      this.$store.commit("product/setUserWishList", wishlist.data);

      this.productIds = this.$store.getters["product/getUserWishList"];
      console.log(this.productIds.data);
      this.getProduct();
    },
    /* 찜의 product들을 가져온다. */
    getProduct() {
      for (var item in this.productIds) {
        apiProduct
          .getProduct(this.productIds[item].pid)
          .then((response) => {
            this.products.push(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    /* WishList에 상품 추가/삭제 */
    async WishCreateDelete(wishState, pid) {
      /*wishState가 false일 경우 wishList 테이블에서 제거*/
      if (!wishState) {
        await apiMember.deleteWishList(pid);
      } else {
        /*wishState가 true일 경우 wishList 테이블에 추가*/
        await apiMember.createWishList(pid);
      }

      const wishlist = await apiMember.getWishList();
      this.$store.commit("product/setUserWishList", wishlist.data);
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("gnb/setCurrentPage", "wishlist");
    this.getWishList();
  },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

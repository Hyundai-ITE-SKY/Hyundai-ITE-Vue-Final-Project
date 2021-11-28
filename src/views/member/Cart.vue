<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div>
    <div class="d-flex justify-space-between mt-5 ml-4 mr-4 mb-0">
      <v-checkbox color="black" class="mt-0 pt-0" v-model="selectedAll">
        <template v-slot:label class="mb-0">
          <div style="font-size: 14px">전체선택</div>
        </template>
      </v-checkbox>
      <div class="align-center">
        <a class="grey--text" style="font-size: 14px">선택삭제</a>
      </div>
    </div>
    <!--반복되는 부분-->
    <div v-for="(product,i) in products" :key="product.pid">
      <div v-for="info in infos" :key="info.pid">
        <template v-if="product.pid === info.pid">
          <cart-item
            :bname="info.bname"
            :cimage1="info.cimage1"
            :pcolor="product.pcolor"
            :pname="info.pname"
            :pprice="info.pprice"
            :pamount="product.pamount"
            :psize="product.psize"
            :selected="false"
            :checkboxValue="i.toString()"
          >
          </cart-item>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import member from "@/apis/member";
import product from "@/apis/product";
import CartItem from "./CartItem.vue";

export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "Cart",
  //추가하고 싶은 컴포넌트를 등록
  components: { CartItem },
  //컴포넌트 데이터 정의
  data() {
    return {
      products: null,
      infos: [],
      count: 0,
      selected : []
    };
  },
  //컴포넌트 메서드터 정의
  methods: {
    getCart() {
      var mid = this.$store.state.login.userId;
      member
        .getCart(mid)
        .then((response) => {
          this.products = response.data;
          this.getProductInfo(this.products);
          this.count = this.products.length;
          console.log(this.count);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProductInfo(products) {
      var i;
      for (i of products) {
        product
          .getProductInfo(i.pid, i.pcolor)
          .then((res) => {
            // console.log(res.data);
            this.infos.push(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  computed: {
    selectedAll: {
      set(val) {
        this.selected = [];
        if (val) {
          for (let i = 0; i < this.count; i++) {
            this.selected.push(i);
          }
        }
      },
      get() {
        return this.selected.length === this.count;
      },
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    
    this.$store.commit("gnb/setCurrentPage", "cart");
    this.getCart();
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

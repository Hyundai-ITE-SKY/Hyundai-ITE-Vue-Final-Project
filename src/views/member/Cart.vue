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
    <div v-for="(product, i) of products" :key="product.pid">
      <div v-for="info of infos" :key="info.pid">
        <template v-if="product.pid === info.pid">
          <cart-item
            :pid="info.pid"
            :bname="info.bname"
            :cimage1="info.cimage1"
            :pcolor="product.pcolor"
            :pname="info.pname"
            :pprice="info.pprice"
            :pamount="product.pamount"
            :psize="product.psize"
            :checkboxValue="i+1"
            :isWish="checkIsWish(info.pid)"
            :pcolorList="colors[i]"
            @cartItemHandleWish="WishCreateDelete"
            @cartItemHandleDelete="CartitemDelete"
            @updateSelected="IsSelected"
          >
          </cart-item>
        </template>
      </div>
    </div>
    <!--반복 끝-->
  </div>
</template>
<script>
import apiMember from "@/apis/member";
import apiProduct from "@/apis/product";
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
      selected: [],
      colors:[],
      selectedIndex:[]
    };
  },
  //컴포넌트 메서드터 정의
  methods: {
    getCart() {
      var mid = this.$store.state.login.userId;
      apiMember
        .getCart(mid)
        .then((response) => {
          this.products = response.data;
          this.getProductInfo(this.products);
          this.testGetColors(this.products);
          this.count = this.products.length;
          console.log('###장바구니item개수:', this.count);
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProductInfo(products) {
      var i;
      for (i of products) {
        apiProduct
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
    //카트아이템 컴포넌트의 셀렉트가 바뀔 때마다 실행되는 함수
    IsSelected(checkboxValue, newValue){
      if(newValue!==null){ //넘어온 값이 null이 아니라면 선택된 상품의 인덱스(제일 위가 1번)가 selected에 들어감
        if(!this.selected.includes(newValue)){
          this.selected[checkboxValue-1] = newValue;
        }
      }else{//null이라면 해당 값을 삭제 해줘야함 -> 해당 값을 알 방법이 
        this.selected.splice(checkboxValue-1, 1);
      }
    },
    /////테스트용테스트용테스트용
    testGetColors(products){
      for(var i of products){
        apiProduct.getProduct(i.pid)
        .then((res)=>{
          this.colors.push(res.data.colors);
          console.log('########', this.colors);
        })
      }
    },
    checkIsWish(pid) {
      const wishlist = this.$store.getters["product/getUserWishList"];
      for (let item of wishlist) {
        if (item.pid === pid) {
          return true;
        }
      }
      return false;
    },
    /* WishList에 상품 추가/삭제 */
    async WishCreateDelete(wishState, pid) {
      /* wishState가 false일 경우 wishList 테이블에서 제거 */
      if (!wishState) {
        await apiMember.deleteWishList(pid);
      } else {
        /* wishState가 true일 경우 wishList 테이블에 추가 */
        await apiMember.createWishList(pid);
      }
      const wishlist = await apiMember.getWishList();
      console.log(wishlist.data);
      this.$store.commit("product/setUserWishList", wishlist.data);
    },
    async CartitemDelete(pid, pcolor, psize) {
      console.log(pid, pcolor, psize);
      await apiMember
        .deleteCartitem(pid, pcolor, psize)
        .then((response) => {
          location.reload(true); // 삭제 후 강제 refresh
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    computed: {
      selectedAll: {
        set(val) {
          // this.selected = [];
          // if (val) {
          //   for (let i = 0; i < this.count; i++) {
          //     this.selected.push(i);
          //   }
          // }
          console.log(val, this.selected);
        },
        get() {
          return this.selected.length === this.count;
        },
      },
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("setOnTabs", false);
    this.$store.commit("setOnProduct", 0);

    this.getCart();
    console.log('selected:', this.selected);
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

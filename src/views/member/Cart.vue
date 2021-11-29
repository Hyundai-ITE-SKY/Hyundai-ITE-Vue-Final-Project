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
        <a class="grey--text" style="font-size: 14px" @click="CartSelectedDelete">선택삭제</a>
      </div>
    </div>
    <!--반복되는 부분-->
    <div v-for="(product, i) of products" :key="i">
      <div v-for="(info, j) of infos" :key="info.pid">
        <template v-if="product.pid === info.pid">
          <div>
            <v-divider></v-divider>
            <div class="white d-flex ma-0 pa-0 mb-2 mt-5">
              <v-row class="ma-0">
                <v-col cols="1">
                  <v-checkbox color="black" v-model="selected" :value="i"></v-checkbox>
                </v-col>
                <v-col cols="3" class="pa-0 pl-3">
                  <div style="width: 80px">
                    <v-img :src="images[j]" contain />
                  </div>
                </v-col>
                <v-col class="ml-2">
                  <v-row>
                    <v-col
                      cols="10"
                      class="pa-0 font-weight-black text-truncate"
                      style="font-size: 15px"
                      >{{ info.bname }}
                    </v-col>
                    <v-col cols="2" class="pa-0 pr-1"
                      ><v-icon @click="handleDelete(product.pid, product.pcolor, product.psize)"
                        >mdi-close</v-icon
                      ></v-col
                    >
                    <v-col cols="12" class="pa-0 text-truncate" style="font-size: 15px">
                      {{ info.pname }}
                    </v-col>
                    <v-col cols="12" class="pa-0" style="font-size: 14px; color: grey"
                      >옵션 : {{ product.pcolor }}_{{ product.psize }}</v-col
                    >
                    <v-col cols="12" class="pa-0" style="font-size: 14px; color: grey"
                      >수량 : {{ product.pamount }} 개</v-col
                    >
                    <v-col cols="12" class="font-weight-black ma-0 pt-2"
                      >{{ (info.pprice * product.pamount).toLocaleString() }} 원</v-col
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
                    <v-select
                      :items="colors[j]"
                      v-model="selectedColor"
                      label="COLOR 선택"
                      dense
                      solo
                      outlined
                    ></v-select>
                    <v-select
                      :items="sizes[j][selectedColor]"
                      label="SIZE 선택"
                      dense
                      solo
                      outlined
                    ></v-select>
                    <div class="justify-center">
                      <v-btn>취소</v-btn>
                      <v-btn>변경사항 저장</v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-expand-transition>
          </div>
        </template>
      </div>
    </div>
    <!--반복 끝-->
    <div class="mb-15 ml-7 mr-7 mt-8">
      <div class="mb-2 d-flex justify-space-between" style="font-size: 14px">
        <div>총 상품금액</div>
        <div>얼마얼마</div>
      </div>
      <div class="mb-2 d-flex justify-space-between" style="font-size: 14px">
        <div>총 배송비</div>
        <div>0 원</div>
      </div>
      <v-divider></v-divider>
      <div class="mb-3 mt-3 d-flex justify-space-between" style="font-weight: bold">
        <div>총 주문금액</div>
        <div>{{ totalSum }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import apiMember from "@/apis/member";
import apiProduct from "@/apis/product";

export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "Cart",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      state: false,
      show: false,
      products: null,
      infos: [],
      count: 0,
      selected: [],
      colors: [],
      sizes: [],
      images: [],
      totalSum: 0,
      selectedColor: "none",
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
          this.count = this.products.length;
          console.log("###장바구니item개수:", this.count);
          console.log("mycart :: ", this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProductInfo(products) {
      for (let i of products) {
        apiProduct
          .getProduct(i.pid)
          .then((res) => {
            console.log("product :: ", res.data);
            this.infos.push(res.data);

            const colorArray = [];
            const sizesObject = {};
            sizesObject['none'] = ['색상을 먼저 선택해주세요.']

            for (let color of res.data.colors) {
              if (color.ccolorcode === i.pcolor) {
                this.images.push(color.cimage1);
              }
              sizesObject[color.ccolorcode] = [];
              for (let stock of color.stocks) {
                sizesObject[color.ccolorcode].push(stock.ssize);
              }
              colorArray.push(color.ccolorcode);
            }
            this.colors.push(colorArray);
            this.sizes.push(sizesObject);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
            console.log(this.sizes);
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
    //일괄 삭제
    CartSelectedDelete() {
      console.log(this.products, this.selected);
      for (let i = 0; i < this.selected.length; i++) {
        // console.log(this.products[this.selected[i]-1]); //삭제해야 할 상품
        var item = this.products[this.selected[i] - 1];
        // console.log(item.pid, item.pcolor, item.psize);
        this.CartitemDelete(item.pid, item.pcolor, item.psize);
      }
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
  },
  computed: {
    selectedAll: {
      set(val) {
        this.selected = [];
        if (val) {
          for (let i = 0; i <= this.count; i++) {
            this.selected.push(i);
          }
        }
        console.log(val, this.selected);
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
    this.$store.commit("setOnTabs", false);
    this.$store.commit("setOnProduct", 0);

    this.getCart();
    console.log("selected:", this.selected);
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

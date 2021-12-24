<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div style="font-size: 0.875rem">
    <div
      class="d-flex align-center justify-space-between pa-3"
      style="border-bottom: 10px solid #eeeeee"
    >
      <div class="d-flex align-center">
        <v-checkbox class="pa-0 ma-0" hide-details="auto" color="black" v-model="selectedAll">
        </v-checkbox>
        <div>전체선택</div>
      </div>
      <div>
        <a class="grey--text" @click="CartSelectedDelete">선택삭제</a>
      </div>
    </div>
    <div
      v-show="products.length === 0"
      class="text-center text--disabled my-6"
      style="font-size: 0.875rem"
    >
      등록된 상품이 없습니다.
    </div>
    <!--반복되는 부분-->
    <div
      class="pa-3"
      v-for="(product, i) of products"
      :key="i"
      style="border-bottom: 1px solid #eeeeee"
    >
      <div v-if="infos.find((x) => x.pid === product.pid) !== undefined">
        <div class="d-flex align-center">
          <v-checkbox
            class="pa-0 ma-0"
            color="black"
            v-model="selected"
            hide-details="auto"
            :value="i"
          ></v-checkbox>
          <div>선택</div>
          <v-icon
            class="ml-auto"
            @click="CartitemDelete(product.pid, product.pcolor, product.psize)"
            >mdi-close</v-icon
          >
        </div>
        <div class="d-flex align-center py-3">
          <div @click="moveProductDetail(product.pid)">
            <div style="width: 80px">
              <v-img :src="images[infos.findIndex((x) => x.pid === product.pid)]" contain />
            </div>
          </div>
          <div class="px-3">
            <div class="pa-0 font-weight-black text-truncate" style="font-size: 0.875rem">
              {{ infos.find((x) => x.pid === product.pid).bname }}
            </div>
            <div
              class="pa-0 text-truncate"
              style="font-size: 0.875rem"
              @click="moveProductDetail(product.pid)"
            >
              {{ infos.find((x) => x.pid === product.pid).pname }}
            </div>
            <div class="pa-0" style="font-size: 0.75rem; color: grey">
              옵션: {{ product.pcolor }}_{{ product.psize }}
            </div>
            <div class="mt-2 mb-1">
              <v-layout>
                <v-card-actions class="pa-0">
                  <v-btn dark color="black" @click="clickOption(i)" small style="font-size: 0.7rem">
                    옵션/수량
                    <v-icon>{{ show[i] ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-layout>
            </div>
            <v-btn
              v-if="false"
              dark
              @click="buyNow(product)"
              color="black"
              small
              style="font-size: 0.7rem"
              >구매</v-btn
            >
          </div>
          <div class="text-right ml-auto mr-1 mb-1">
            <div class="ml-auto" style="font-size: 0.75rem; font-weight: bolder; color: #eb7c4c">
              {{ $store.state.product.gradeSale }}%
            </div>
            <div
              class="text-decoration-line-through ml-auto text--disabled text-truncate"
              style="font-size: 0.75rem; font-weight: bolder"
            >
              {{ infos.find((x) => x.pid === product.pid).pprice.toLocaleString() }}원
            </div>
            <div class="text-truncate" style="font-size: 0.875rem; font-weight: bolder">
              {{
                (
                  (infos.find((x) => x.pid === product.pid).pprice *
                    (100 - $store.state.product.gradeSale)) /
                  100
                ).toLocaleString()
              }}원
            </div>
            <div class="pa-0" style="font-size: 0.75rem; color: grey">
              수량: {{ product.pamount }}개
            </div>
            <div class="text-truncate mt-1" style="font-size: 1rem; font-weight: bolder">
              {{
                (
                  ((infos.find((x) => x.pid === product.pid).pprice *
                    (100 - $store.state.product.gradeSale)) /
                    100) *
                  product.pamount
                ).toLocaleString()
              }}원
            </div>
          </div>
        </div>
      </div>
      <v-expand-transition>
        <div v-show="show[i]">
          <div style="border: 1px solid #1c1c1c" class="ml-1 mr-1 mb-3">
            <div class="pa-6">
              <div class="d-flex mb-4">
                <v-select
                  :items="colors[infos.findIndex((x) => x.pid === product.pid)]"
                  v-model="selectedColor"
                  label="COLOR 선택"
                  dense
                  solo
                  outlined
                  hide-details="auto"
                  class="mr-2"
                ></v-select>
                <v-select
                  :items="sizes[infos.findIndex((x) => x.pid === product.pid)][selectedColor]"
                  v-model="selectedSize"
                  label="SIZE 선택"
                  dense
                  solo
                  outlined
                  hide-details="auto"
                ></v-select>
              </div>
              <div class="mb-5 d-flex justify-space-between align-center">
                <div>수량</div>
                <div class="d-flex align-center">
                  <v-btn x-small dark color="black" fab @click="countPamount('minus', i)">
                    <v-icon dark> mdi-minus </v-icon>
                  </v-btn>
                  <div class="ml-2 mr-2">{{ amounts[i] }}</div>
                  <v-btn x-small dark color="black" fab @click="countPamount('plus', i)">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="d-flex justify-center">
                <div class="mr-2">
                  <v-btn @click="show[i] = !show[i]" outlined style="font-size: 0.7rem" small
                    >취소</v-btn
                  >
                </div>
                <div>
                  <v-btn
                    @click="updateCartItem(product.pid, product.pcolor, product.psize, i)"
                    color="black"
                    dark
                    style="font-size: 0.7rem"
                    small
                    >변경사항 저장</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-expand-transition>
    </div>
    <!--반복 끝-->
    <div class="pa-3" style="border-top: 9px solid #eeeeee">
      <div class="mb-2 d-flex justify-space-between" style="font-size: 0.875rem">
        <div>총 상품금액</div>
        <div>{{ totalSum.toLocaleString() }}원</div>
      </div>
      <div class="mb-2 d-flex justify-space-between" style="font-size: 0.875rem">
        <div>총 배송비</div>
        <div>0원</div>
      </div>
      <v-divider></v-divider>
      <div class="mb-3 mt-3 d-flex justify-space-between" style="font-weight: bold">
        <div>총 주문금액</div>
        <div>{{ totalSum.toLocaleString() }}원</div>
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
      show: [],
      products: null,
      infos: [],
      count: 0,
      selected: [],
      colors: [],
      colorIndex: [],
      sizes: [],
      images: [],
      totalSum: 0,
      selectedColor: "none",
      selectedSize: "none",
      amounts: [],
      cartToOrder: [],
    };
  },
  //컴포넌트 메서드터 정의
  methods: {
    clickOption(i) {
      this.show.splice(i, 1, !this.show[i]);
    },
    moveProductDetail(pid) {
      this.$router.push(`/product/detail?pid=${pid}`).catch(() => {});
    },
    getCart() {
      // var mid = this.$store.state.login.userId;
      apiMember
        .getCart()
        .then((response) => {
          this.products = response.data;
          this.getProductInfo(this.products);
          this.count = this.products.length;
          for (let i = 0; i < this.products.length; i++) {
            this.show.push(false);
            this.amounts.push(1);
          }
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
            this.infos.push(res.data);
            const colorArray = [];
            const sizesObject = {};
            sizesObject["none"] = ["색상을 먼저 선택해주세요."];

            for (let color of res.data.colors) {
              if (color.ccolorcode === i.pcolor) {
                this.images.push(color.cimage1);
                this.colorIndex.push(color.ccolorcode);
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
    },
    //일괄 삭제
    CartSelectedDelete() {
      for (let i = 0; i < this.selected.length; i++) {
        var item = this.products[this.selected[i]];
        this.CartitemDelete(item.pid, item.pcolor, item.psize);
      }
    },
    async CartitemDelete(pid, pcolor, psize) {
      await apiMember
        .deleteCartitem(pid, pcolor, psize)
        .then(() => {
          location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCartItem(pid, pcolor, psize, i) {
      if (this.selectedColor == "none" || this.selectedSize == "none") {
        alert("선택해주세요");
      }
      let pamount = this.amounts[i];
      const formData = new FormData();
      formData.append("pid", pid);
      formData.append("pcolor", pcolor);
      formData.append("psize", psize);
      formData.append("aftercolor", this.selectedColor);
      formData.append("aftersize", this.selectedSize);
      formData.append("pamount", pamount);
      apiMember
        .updateCartitem(formData)
        .then(() => {
          location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    countPamount(type, idx) {
      if (type == "minus") {
        if (this.amounts[idx] > 1) {
          this.amounts.splice(idx, 1, this.amounts[idx] - 1);
        }
      } else {
        this.amounts.splice(idx, 1, this.amounts[idx] + 1);
      }
    },
    buyNow(product) {
      var buyProduct = [];
      buyProduct.push(product);
      this.$store.commit("cart/setProductToBuy", buyProduct);
      this.$router.push("/order/order");
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
  watch: {
    //체크박스 감시
    selected(newvalue) {
      let sum = 0;
      let i = 0;
      for (let product of this.products) {
        if (newvalue.indexOf(i) > -1) {
          for (let info of this.infos) {
            if (product.pid === info.pid) {
              sum +=
                ((info.pprice * (100 - this.$store.state.product.gradeSale)) / 100) *
                product.pamount;
            }
          }
        }
        i += 1;
      }

      this.totalSum = sum;
      this.cartToOrder = [];

      for (let select of this.selected) {
        this.cartToOrder.push(this.products[select]);
      }

      this.$store.commit("cart/setProductToBuy", this.cartToOrder);
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("cart/setProductToBuy", []);
    this.$store.commit("gnb/setCurrentPage", "cart");
    this.getCart();
  },
};
</script>
<style scoped></style>

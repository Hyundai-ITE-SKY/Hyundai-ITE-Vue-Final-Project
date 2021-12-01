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
                <v-col cols="3" class="pa-0 pl-3" @click="moveProductDetail(product.pid)">
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
                      ><v-icon @click="CartitemDelete(product.pid, product.pcolor, product.psize)"
                        >mdi-close</v-icon
                      ></v-col
                    >
                    <v-col
                      cols="12"
                      class="pa-0 text-truncate"
                      style="font-size: 15px"
                      @click="moveProductDetail(product.pid)"
                    >
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
                    <v-btn dark class="mr-3" outlined color="black" @click="clickOption(i)">
                      옵션/수량
                      <v-icon>{{ show[i] ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
                    </v-btn>
                    <v-btn dark to="/order/order" outlined color="black">바로 구매</v-btn>
                  </v-card-actions>
                </v-layout>
              </v-row>
            </div>
            <v-expand-transition>
              <div v-show="show[i]">
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
                      v-model="selectedSize"
                      label="SIZE 선택"
                      dense
                      solo
                      outlined
                    ></v-select>
                    <div class="mb-5 d-flex justify-space-between">
                      <div>수량</div>
                      <div class="d-flex">
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
                        <v-btn @click="show[i] = !show[i]" outlined>취소</v-btn>
                      </div>
                      <div>
                        <v-btn
                          @click="updateCartItem(product.pid, product.pcolor, product.psize, i)"
                          color="black"
                          dark
                          >변경사항 저장</v-btn
                        >
                      </div>
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
        <div>{{ totalSum.toLocaleString() }} 원</div>
      </div>
      <div class="mb-2 d-flex justify-space-between" style="font-size: 14px">
        <div>총 배송비</div>
        <div>0 원</div>
      </div>
      <v-divider></v-divider>
      <div class="mb-3 mt-3 d-flex justify-space-between" style="font-weight: bold">
        <div>총 주문금액</div>
        <div>{{ totalSum.toLocaleString() }} 원</div>
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
          // console.log(this.show);
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
            // console.log("product :: ", res.data);
            this.infos.push(res.data);

            const colorArray = [];
            const sizesObject = {};
            sizesObject["none"] = ["색상을 먼저 선택해주세요."];

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
    },
    //일괄 삭제
    CartSelectedDelete() {
      // console.log(this.products, this.selected);
      for (let i = 0; i < this.selected.length; i++) {
        // console.log(this.products[this.selected[i]-1]); //삭제해야 할 상품
        var item = this.products[this.selected[i]];
        // console.log(item.pid, item.pcolor, item.psize);
        this.CartitemDelete(item.pid, item.pcolor, item.psize);
      }
    },
    async CartitemDelete(pid, pcolor, psize) {
      // console.log(pid, pcolor, psize);
      await apiMember
        .deleteCartitem(pid, pcolor, psize)
        .then(() => {
          location.reload(true); // 삭제 후 강제 refresh
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCartItem(pid, pcolor, psize, i) {
      //모달창으로 처리할 부분
      if (this.selectedColor == "none" || this.selectedSize == "none") {
        alert("선택해주세요");
      }
      // console.log(this.selectedColor, this.selectedSize);
      // console.log(pid, pcolor, psize);
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
          // console.log(response.data);
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
        // console.log(val, this.selected);
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
              sum += info.pprice * product.pamount;
            }
          }
        }
        i += 1;
      }
      this.totalSum = sum;
      // console.log(this.selected);
      this.cartToOrder = [];
      for (let select of this.selected) {
        // console.log(this.products[select]);
        this.cartToOrder.push(this.products[select]);
      }

      this.$store.commit("cart/setProductToBuy", this.cartToOrder);
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("gnb/setCurrentPage", "cart");
    this.getCart();
    // console.log("selected:", this.selected);
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

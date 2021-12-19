<!-- 컴포넌트 UI 정의 -->
<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-tabs background-color="transparent" color="black" center-active>
        <v-tab v-for="(tab, idx) in category" :key="idx">{{ tab.clarge }}</v-tab>
        <v-tab-item v-for="n in 4" :key="n">
          <template v-for="(cm, i) in category[n - 1].cmedium">
            <!--대분류 전체 보기-->
            <v-list-item
              v-if="i === 0"
              :key="i"
              @click="moveProductList(category[n - 1].clarge, 'none', 'none')"
            >
              <v-list-item-title style="font-size: 14px; font-weight: bold">
                {{ cm.cmedium }}
              </v-list-item-title>
            </v-list-item>
            <!--중분류-->
            <v-list-group v-if="i > 0" :key="i" color="red">
              <template v-slot:activator>
                <v-list-item-title style="font-size: 14px; font-weight: bold">
                  {{ cm.cmedium }}
                </v-list-item-title>
              </template>
              <v-list-item
                v-for="(cs, k) in category[n - 1].cmedium[i].csmall"
                :key="k"
                @click="
                  moveProductList(category[n - 1].clarge, category[n - 1].cmedium[i].cmedium, cs)
                "
              >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <v-list-item-title style="font-size: 13px">{{ cs }} </v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </v-tab-item>
      </v-tabs>
      <template v-slot:append>
        <div class="pa-2" v-if="$store.state.login.userId === ''">
          <v-btn color="black" dark block to="/login"> Login </v-btn>
        </div>
        <div class="pa-2" v-if="$store.state.login.userId !== ''">
          <v-btn color="black" dark block to="/" @click="handleLogout()"> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="black" dense dark extension-height="35px">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer>
        <div
          class="text-center"
          style="font-size: 0.875rem; font-weight: bolder"
          @click="movePage('main')"
        >
          HANDSOME
        </div>
      </v-spacer>
      <v-btn icon @click="movePage('cartWithNoSave')">
        <v-icon color="white">mdi-cart-outline</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs v-show="$store.state.gnb.currentPage === 'main'" align-with-title>
          <v-tab style="font-size: 0.7rem; font-weight: bolder" @click="changeMainPage('EVENT')"
            >EVENT</v-tab
          >
          <v-tab style="font-size: 0.7rem; font-weight: bolder" @click="changeMainPage('BEST')"
            >BEST</v-tab
          >
          <v-tab style="font-size: 0.7rem; font-weight: bolder" @click="changeMainPage('NEW')"
            >NEW</v-tab
          >
        </v-tabs>
        <div
          v-show="
            $store.state.gnb.currentPage === 'cart' ||
            $store.state.gnb.currentPage === 'wishlist' ||
            $store.state.gnb.currentPage === 'login' ||
            $store.state.gnb.currentPage === 'eventdetail' ||
            $store.state.gnb.currentPage === 'mypage' ||
            $store.state.gnb.currentPage === 'productdetail' ||
            $store.state.gnb.currentPage === 'productdetailbuy' ||
            $store.state.gnb.currentPage === 'order' ||
            $store.state.gnb.currentPage === 'orderlist' ||
            $store.state.gnb.currentPage === 'orderdetail' ||
            $store.state.gnb.currentPage === 'ordersuccess'
          "
          class="text-center"
          style="font-size: 0.875rem; font-weight: bolder; width: 100%"
        >
          {{ getPageName($store.state.gnb.currentPage) }}
        </div>
        <div
          v-show="$store.state.gnb.currentPage === 'productlist'"
          class="text-center text-truncate"
          style="font-size: 0.875rem; font-weight: bolder; width: 100%"
        >
          <span v-show="$store.state.product.category[0] === 'none'">전체보기</span>
          <span v-show="$store.state.product.category[0] !== 'none'">
            {{ $store.state.product.category[0] }}</span
          >
          <span v-show="$store.state.product.category[1] !== 'none'" class="ml-3 mr-3">></span>
          <span v-show="$store.state.product.category[1] !== 'none'">
            {{ $store.state.product.category[1] }}</span
          >
          <span v-show="$store.state.product.category[2] !== 'none'" class="ml-3 mr-3">></span>
          <span v-show="$store.state.product.category[2] !== 'none'">
            {{ $store.state.product.category[2] }}</span
          >
        </div>
      </template>
    </v-app-bar>

    <div style="padding-top: 83px; padding-bottom: 56px">
      <router-view ref="childRef"></router-view>
    </div>

    <v-bottom-navigation app color="black" class="bottom-nav">
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'productdetailbuy' &&
          $store.state.gnb.currentPage !== 'order' &&
          $store.state.gnb.currentPage !== 'cart'
        "
        @click="movePage('main')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-home-outline</v-icon>
      </v-btn>
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'productdetailbuy' &&
          $store.state.gnb.currentPage !== 'order' &&
          $store.state.gnb.currentPage !== 'cart'
        "
        @click="movePage('wishlist')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-cart-heart</v-icon>
      </v-btn>
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'productdetailbuy' &&
          $store.state.gnb.currentPage !== 'order' &&
          $store.state.gnb.currentPage !== 'cart'
        "
        @click="movePage('orderlist')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-shopping-outline</v-icon>
      </v-btn>
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'productdetailbuy' &&
          $store.state.gnb.currentPage !== 'order' &&
          $store.state.gnb.currentPage !== 'cart'
        "
        @click="movePage('mypage')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-account-outline</v-icon>
      </v-btn>

      <v-btn v-show="$store.state.gnb.currentPage === 'productdetail'" plain @click="moveBack">
        <span>뒤로 가기</span>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-bottom-sheet v-model="bottomsheet">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="$store.state.gnb.currentPage === 'productdetail'"
            v-bind="attrs"
            v-on="on"
            plain
          >
            <span>옵션 선택</span>
            <v-icon>mdi-hanger</v-icon>
          </v-btn>
        </template>
        <v-sheet width="100vw" color="#FEFEFE">
          <div class="pa-6">
            <div class="text-truncate" style="font-size: 1rem; font-weight: bolder">
              {{ $store.state.product.selectedProduct.bname }}
            </div>
            <div
              class="mt-1 mb-3 text-truncate"
              style="font-size: 0.875rem; font-weight: bolder; color: #6b6b6b"
            >
              {{ $store.state.product.selectedProduct.pname }}
            </div>
            <div style="display: flex">
              <v-select
                class="mr-6"
                :items="$store.state.product.colorList"
                v-model="selectedColor"
                label="색상"
                style="font-size: 0.875rem; font-weight: bolder"
              ></v-select>
              <v-select
                class="mr-6"
                :disabled="selectedColor === 'none'"
                :items="$store.state.product.sizeList[selectedColor]"
                v-model="selectedSize"
                label="사이즈"
                style="font-size: 0.875rem; font-weight: bolder"
              ></v-select>
              <v-text-field
                label="개수"
                :disabled="selectedColor === 'none' || selectedSize === 'none'"
                v-model="inputAmount"
                style="font-size: 0.875rem; font-weight: bolder"
                clearable
              ></v-text-field>
            </div>
            <div class="text-right mt-2" style="font-size: 0.875rem">
              총 상품 금액
              <span style="font-size: 1rem; font-weight: bolder">{{
                (
                  inputAmount *
                  Math.floor(
                    ($store.state.product.selectedProduct.pprice *
                      (100 - $store.state.product.gradeSale)) /
                      100,
                  )
                ).toLocaleString()
              }}</span
              >원
            </div>
          </div>
          <v-btn
            color="#CCCCCC"
            tile
            @click="bottomsheet = !bottomsheet"
            width="30vw"
            height="48px"
          >
            <v-icon class="mr-1">mdi-close</v-icon><span>CANCEL</span>
          </v-btn>
          <v-btn
            color="#333333"
            dark
            tile
            @click="movePage('order')"
            width="35vw"
            height="48px"
            :disabled="selectedSize == 'none' || inputAmount < 1"
          >
            <v-icon class="mr-1">mdi-shopping-outline</v-icon><span>BUY NOW</span>
          </v-btn>
          <v-btn
            color="#1A1A1A"
            dark
            tile
            @click="movePage('cart')"
            width="35vw"
            height="48px"
            :disabled="selectedSize == 'none' || inputAmount < 1"
          >
            <v-icon class="mr-1">mdi-cart-outline</v-icon><span>CART</span>
          </v-btn>
        </v-sheet>
      </v-bottom-sheet>

      <v-btn
        v-show="$store.state.gnb.currentPage === 'order'"
        @click="movePage('ordersuccess')"
        plain
      >
        <span>결제하기</span>
        <v-icon>mdi-credit-card-outline</v-icon>
      </v-btn>

      <v-btn
        v-show="$store.state.gnb.currentPage === 'cart'"
        :disabled="$store.getters['cart/getProductToBuy'].length === 0"
        @click="movePage('order')"
        plain
      >
        <span>주문하기</span>
        <v-icon>mdi-barcode-scan</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import apiMember from "@/apis/member";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    bottomsheet: false,
    categoryState: 0,
    selectedColor: "none",
    selectedSize: "none",
    inputAmount: 1,
    category: [
      {
        clarge: "WOMEN",
        cmedium: [
          {
            cmedium: "전체보기",
          },
          {
            cmedium: "DRESS",
            csmall: ["전체보기", "LONG|MAXI DRESS", "MIDI DRESS", "MINI DRESS"],
          },
          {
            cmedium: "FASHION ACC.",
            csmall: ["전체보기", "BAGS", "ETC", "SCARF|MUFFLER"],
          },
          {
            cmedium: "OUTER",
            csmall: [
              "전체보기",
              "COAT",
              "Cardigan|Vest",
              "DOWN JUMPER",
              "JACKET",
              "JUMPER",
              "TRENCH COAT",
            ],
          },
          {
            cmedium: "PANTS",
            csmall: ["전체보기", "CASUAL", "DENIM", "FORMAL", "SHORTS"],
          },
          {
            cmedium: "SKIRT",
            csmall: ["전체보기", "FLARE SKIRT", "LONG|MAXI SKIRT", "MINI SKIRT", "PENCIL SKIRT"],
          },
          {
            cmedium: "SPECIAL SHOP",
            csmall: [
              "전체보기",
              "FOURM THE STORE : PALETTE",
              "LATT : 2021 FUR WEEK",
              "O'2nd : M|M (PARIS)",
              "O'2nd : WE",
              "TIME : 1993 CLUB",
              "TIME : ONLINE EXCLUSIVE",
              "TIME SIGNATURE SUIT",
              "the CASHMERE : WELLNESS LINE",
            ],
          },
          {
            cmedium: "Top",
            csmall: ["전체보기", "Blouse", "Knit", "Shirts", "T-Shirts"],
          },
        ],
      },
      {
        clarge: "MEN",
        cmedium: [
          {
            cmedium: "전체보기",
          },
          {
            cmedium: "OUTER",
            csmall: [
              "전체보기",
              "CARDIGAN|VEST",
              "COAT",
              "DOWN JUMPER",
              "JACKET",
              "JUMPER",
              "TRENCH COAT",
            ],
          },
          {
            cmedium: "PANTS",
            csmall: ["전체보기", "데님", "루즈|테이퍼드", "쇼츠", "스트레이트", "조거|트랙"],
          },
          {
            cmedium: "SPECIAL SHOP",
            csmall: ["전체보기", "TIME HOMME : ONLINE EXCLUSIVE"],
          },
          {
            cmedium: "Suit",
            csmall: ["전체보기", "DRESS SHIRTS", "SUIT JACKET", "SUIT PANTS"],
          },
          {
            cmedium: "TOP",
            csmall: ["전체보기", "KNIT", "SHIRTS", "T-SHIRTS"],
          },
        ],
      },
      {
        clarge: "KIDS",
        cmedium: [
          {
            cmedium: "전체보기",
          },
          {
            cmedium: "CLOTHING",
            csmall: ["전체보기", "BOTTOM", "TOP"],
          },
          {
            cmedium: "KIDS ACC.",
            csmall: ["전체보기", "OTHER ACCESSORIES"],
          },
        ],
      },
      {
        clarge: "LIFESTYLE",
        cmedium: [
          {
            cmedium: "전체보기",
          },
          {
            cmedium: "BATH",
            csmall: ["전체보기", "OTHER ACCESSORIES"],
          },
          {
            cmedium: "HOME",
            csmall: ["전체보기", "FABRIC", "FRAGRANCE", "OTHER ACCESSORIES"],
          },
        ],
      },
    ],
  }),
  methods: {
    changeMainPage(page) {
      this.$store.commit("gnb/setMainPage", page);
    },
    getPageName(page) {
      if (page === "wishlist") {
        return "위시리스트";
      } else if (page === "cart") {
        return "장바구니";
      } else if (page === "mypage") {
        return "마이페이지";
      } else if (page === "login") {
        return "로그인";
      } else if (page === "productdetail" || page === "productdetailbuy") {
        return "상세보기";
      } else if (page === "eventdetail") {
        return "이벤트 상세보기";
      } else if (page === "order") {
        return "결제하기";
      } else if (page === "orderlist") {
        return "주문내역";
      } else if (page === "orderdetail") {
        return "주문 상세내역";
      } else if (page === "ordersuccess") {
        return "주문완료";
      }
    },
    movePage(page) {
      this.bottomsheet = false;
      if (page === "main") {
        this.$router.push("/").catch(() => {});
      } else if (page === "wishlist") {
        this.$router.push("/member/wishlist").catch(() => {});
      } else if (page === "orderlist") {
        this.$router.push("/order/list").catch(() => {});
      } else if (page === "mypage") {
        this.$router.push("/member/mypage").catch(() => {});
      } else if (page === "order") {
        this.$router.push("/order/order").catch(() => {});
      } else if (page === "cart") {
        this.createCartitem(); //장바구니 추가
      } else if (page === "cartWithNoSave") {
        this.resetInput();
        this.$router.push("/member/cart").catch(() => {});
      } else if (page === "ordersuccess") {
        this.$refs.childRef.orderSuccess();
        this.$store.commit("cart/setProductToBuy", []);
      }
    },
    moveBack() {
      this.resetInput();
      this.$router.go(-1);
    },
    moveProductList(large, medium, small) {
      large = large === "전체보기" ? "none" : large;
      medium = medium === "전체보기" ? "none" : medium;
      small = small === "전체보기" ? "none" : small;

      this.$router
        .push(`/product/list?large=${large}&medium=${medium}&small=${small}&pageno=1`)
        .catch(() => {});
    },
    resetInput() {
      this.inputAmount = 1;
      this.selectedColor = "none";
      this.selectedSize = "none";
    },
    handleLogout() {
      this.$store.dispatch("login/deleteAuth");
      this.$router.push("/").catch(() => {});
    },
    async createCartitem() {
      const formData = new FormData();
      formData.append("pid", this.$store.state.product.selectedProduct.pid);
      formData.append("pcolor", this.selectedColor);
      formData.append("psize", this.selectedSize);
      formData.append("pamount", this.inputAmount);
      await apiMember
        .createCartitem(formData)
        .then((response) => {
          console.log(response.data);
          this.resetInput();
          this.$router.push("/member/cart").catch(() => {});
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.$store.dispatch("login/loadAuth");
  },
  watch: {
    bottomsheet: function () {
      if (this.bottomsheet === false) {
        this.$store.commit("gnb/setCurrentPage", "productdetail");
      } else {
        this.$store.commit("gnb/setCurrentPage", "productdetailbuy");
      }
    },
    selectedColor: function () {
      this.selectedSize = "none";
    },
  },
};
</script>

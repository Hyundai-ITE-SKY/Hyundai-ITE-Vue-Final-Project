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
      <v-btn icon @click="movePage('cart')">
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
            $store.state.gnb.currentPage === 'mypage' ||
            $store.state.gnb.currentPage === 'order' ||
            $store.state.gnb.currentPage === 'orderlist'
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
      <router-view></router-view>
    </div>

    <v-bottom-navigation app color="black">
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'order'
        "
        @click="movePage('main')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-home-outline</v-icon>
      </v-btn>
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'order'
        "
        @click="movePage('wishlist')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-cart-heart</v-icon>
      </v-btn>
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'order'
        "
        @click="movePage('orderlist')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-shopping-outline</v-icon>
      </v-btn>
      <v-btn
        v-show="
          $store.state.gnb.currentPage !== 'productdetail' &&
          $store.state.gnb.currentPage !== 'order'
        "
        @click="movePage('mypage')"
        plain
      >
        <v-icon style="margin: 0px; padding: 0px">mdi-account-outline</v-icon>
      </v-btn>

      <v-btn
        v-show="$store.state.gnb.currentPage === 'productdetail'"
        @click="movePage('order')"
        plain
      >
        <span>BUY NOW</span>
        <v-icon>mdi-shopping-outline</v-icon>
      </v-btn>
      <v-btn
        v-show="$store.state.gnb.currentPage === 'productdetail'"
        @click="movePage('cart')"
        plain
      >
        <span>CART</span>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>

      <v-btn
        v-show="$store.state.gnb.currentPage === 'order'"
        @click="movePage('ordersuccess')"
        plain
      >
        <span>결제하기</span>
        <v-icon>mdi-credit-card-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    categoryState: 0,
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
      } else if (page === "order") {
        return "결제하기";
      } else if (page === "orderlist") {
        return "주문내역";
      }
    },
    movePage(page) {
      if (page === "main") {
        this.$router.push("/home/main").catch(() => {});
      } else if (page === "wishlist") {
        this.$router.push("/member/wishlist").catch(() => {});
      } else if (page === "orderlist") {
        this.$router.push("/order/list").catch(() => {});
      } else if (page === "mypage") {
        this.$router.push("/member/mypage").catch(() => {});
      } else if (page === "order") {
        this.$router.push("/order/order").catch(() => {});
      } else if (page === "cart") {
        this.$router.push("/member/cart").catch(() => {});
      } else if (page === "ordersuccess") {
        this.$router.push("/order/success").catch(() => {});
      }
    },
    moveProductList(large, medium, small) {
      large = large === "전체보기" ? "none" : large;
      medium = medium === "전체보기" ? "none" : medium;
      small = small === "전체보기" ? "none" : small;

      this.$router
        .push(`/product/list?large=${large}&medium=${medium}&small=${small}&pageno=1`)
        .catch(() => {});
    },
    handleLogout() {
      this.$store.dispatch("login/deleteAuth");
      this.$router.push("/home/main").catch(() => {});
    },
  },
  created() {
    this.$store.dispatch("login/loadAuth");
  },
};
</script>

<!-- 컴포넌트 UI 정의 -->
<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-tabs background-color="transparent" color="black" center-active>
        <!-- <v-tab @click="setCategoryState(0)">WOMEN</v-tab>
        <v-tab @click="setCategoryState(1)">MEN</v-tab>
        <v-tab @click="setCategoryState(2)">KIDS</v-tab>
        <v-tab @click="setCategoryState(3)">LIFESTYLE</v-tab> -->

        <v-tab v-for="(tab, idx) in category" :key="idx">{{ tab.clarge }}</v-tab>

        <v-tab-item v-for="n in 4" :key="n">
          <template v-for="(cm, i) in category[n - 1].cmedium">
            <!--대분류 전체 보기-->
            <v-list-item v-if="i === 0" :key="i">
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
              <v-list-item v-for="(cs, n) in category[n - 1].cmedium[i].csmall" :key="n">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <v-list-item-title style="font-size: 13px" @click="movePage()">{{ cs }} </v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </v-tab-item>
      </v-tabs>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="black" dark block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="black"
      dark
      shrink-on-scroll
      src="@/assets/images/background4.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.5)"></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title app></v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon to="/member/cart">
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>

      <template v-if="$store.state.onTabs" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/home/event">이벤트</v-tab>
          <v-tab to="/home/newproduct">신상품</v-tab>
          <v-tab to="/home/bestproduct">베스트</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="100vh">
      <v-container
        fluid
        :style="`padding-top: ${$store.state.onTabs ? '230px' : '130px'}; padding-bottom: 56px`"
        class="pl-0 pr-0"
      >
        <template>
          <router-view></router-view>
        </template>
      </v-container>
    </v-sheet>

    <v-bottom-navigation
      app
      color="black"
      hide-on-scroll
      horizontal
      scroll-target="#scrolling-techniques-3"
      scroll-threshold="0"
    >
      <v-btn v-if="$store.state.onProduct == 0" to="/home/event" @click="moveHome()">
        <v-icon style="margin: 0px; padding: 0px">mdi-home-outline</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.onProduct == 0" to="/member/wishlist" @click="moveOther()">
        <v-icon style="margin: 0px; padding: 0px">mdi-cart-heart</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.onProduct == 0" to="/order/list" @click="moveOther()">
        <v-icon style="margin: 0px; padding: 0px">mdi-shopping-outline</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.onProduct == 0" to="/member/mypage" @click="moveOther()">
        <v-icon style="margin: 0px; padding: 0px">mdi-account-outline</v-icon>
      </v-btn>

      <v-btn v-if="$store.state.onProduct == 1" to="/order/order">
        <span>BUY NOW</span>
        <v-icon>mdi-shopping-outline</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.onProduct == 1" to="/member/cart">
        <span>CART</span>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>

      <v-btn v-if="$store.state.onProduct == 2" to="/order/success">
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
    value: "recent",
    drawer: false,
    categoryState: 0,
    //여기
    category: [
      {
        clarge: "WOMEN",
        cmedium: [
          {
            cmedium: "전체보기",
          },
          {
            cmedium: "DRESS",
            csmall: ["전체보기", "LONG/MAXI DRESS", "MIDI DRESS", "MINI DRESS"],
          },
          {
            cmedium: "FASHION ACC.",
            csmall: ["전체보기", "BAGS", "ETC", "SCARF/MUFFLER"],
          },
          {
            cmedium: "OUTER",
            csmall: [
              "전체보기",
              "COAT",
              "Cardigan/Vest",
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
            csmall: ["전체보기", "FLARE SKIRT", "LONG/MAXI SKIRT", "MINI SKIRT", "PENCIL SKIRT"],
          },
          {
            cmedium: "SPECIAL SHOP",
            csmall: [
              "전체보기",
              "FOURM THE STORE : PALETTE",
              "LATT : 2021 FUR WEEK",
              "O'2nd : M/M (PARIS)",
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
              "CARDIGAN/VEST",
              "COAT",
              "DOWN JUMPER",
              "JACKET",
              "JUMPER",
              "TRENCH COAT",
            ],
          },
          {
            cmedium: "PANTS",
            csmall: ["전체보기", "데님", "루즈/테이퍼드", "쇼츠", "스트레이트", "조거/트랙"],
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
            csmall: ["BOTTOM", "TOP"],
          },
          {
            cmedium: "KIDS ACC.",
            csmall: ["OTHER ACCESSORIES"],
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
    moveHome() {
      this.$store.commit("setOnTabs", true);
      this.$store.commit("setOnProduct", 0);
    },
    moveOther() {
      this.$store.commit("setOnTabs", false);
      this.$store.commit("setOnProduct", 0);
    },
    moveProductDetail() {
      this.$store.commit("setOnTabs", false);
      this.$store.commit("setOnProduct", 1);
    },
    movePayment() {
      this.$store.commit("setOnTabs", false);
      this.$store.commit("setOnProduct", 2);
    },
    movePage(){
      this.$router.push("/product/list");
    }
  },
};
</script>

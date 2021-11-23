<!-- 컴포넌트 UI 정의 -->
<template>
  <v-app>
    <v-navigation-drawer app color="white" v-model="drawer">
      <div class="text-center mt-5" style="font-weight: bolder">STYLE</div>
      <v-list-item>
        <v-chip-group active-class="primary--text" column>
          <v-chip v-for="(style, i) in styles" :key="i" style="text-weight: bolder">{{
            style
          }}</v-chip>
        </v-chip-group>
      </v-list-item>

      <div class="text-center mt-5" style="font-weight: bolder">APPAREL</div>
      <v-list-item>
        <v-chip-group active-class="primary--text" column>
          <v-chip v-for="(appael, i) in appaels" :key="i" style="text-weight: bolder">{{
            appael
          }}</v-chip>
        </v-chip-group>
      </v-list-item>
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

      <v-btn icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>

      <template v-if="onTabs" v-slot:extension>
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
        :style="`padding-top: ${onTabs ? '230px' : '130px'}; padding-bottom: 56px`"
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
      <v-btn v-if="!onProduct" to="/home/event">
        <v-icon style="margin: 0px; padding: 0px">mdi-home-outline</v-icon>
      </v-btn>

      <v-btn v-if="!onProduct" to="/member/wishlist">
        <v-icon style="margin: 0px; padding: 0px">mdi-cart-heart</v-icon>
      </v-btn>

      <v-btn v-if="!onProduct" to="/home/event">
        <v-icon style="margin: 0px; padding: 0px">mdi-shopping-outline</v-icon>
      </v-btn>

      <v-btn v-if="!onProduct" to="/member/mypage">
        <v-icon style="margin: 0px; padding: 0px">mdi-account-outline</v-icon>
      </v-btn>

      <v-btn v-if="onProduct" to="/home/event">
        <span>BUY NOW</span>
        <v-icon>mdi-shopping-outline</v-icon>
      </v-btn>

      <v-btn v-if="onProduct" to="/member">
        <span>CART</span>
        <v-icon>mdi-cart-outline</v-icon>
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
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
    onTabs: true,
    onProduct: false,
    styles: ["MAN", "WOMAN", "KIDS", "LIFE STYLE"],
    appaels: [
      "아우터",
      "원피스",
      "블라우스/셔츠",
      "티셔츠",
      "니트웨어",
      "스커트",
      "팬츠",
      "데님",
      "키즈",
    ],
  }),
};
</script>

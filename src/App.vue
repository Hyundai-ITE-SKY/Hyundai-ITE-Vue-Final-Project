<!-- 컴포넌트 UI 정의 -->
<template>
  <v-app>
    <v-navigation-drawer app color="white" v-model="drawer">
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="model = 0">이벤트</v-tab>
          <v-tab @click="model = 1">신상품</v-tab>
          <v-tab @click="model = 2">베스트</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="100vh">
      <v-container fluid style="padding-top: 230px; padding-bottom: 56px" class="pl-0 pr-0">
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
      scroll-threshold="100"
    >
      <v-btn to="/">
        <v-icon style="margin: 0px; padding: 0px">mdi-home-outline</v-icon>
      </v-btn>

      <v-btn to="/member/wishlist">
        <v-icon style="margin: 0px; padding: 0px">mdi-cart-heart</v-icon>
      </v-btn>

      <v-btn to="/">
        <v-icon style="margin: 0px; padding: 0px">mdi-shopping-outline</v-icon>
      </v-btn>

      <v-btn to="/member">
        <v-icon style="margin: 0px; padding: 0px">mdi-account-outline</v-icon>
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
  }),
};
</script>

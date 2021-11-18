<!-- 컴포넌트 UI 정의 -->
<template>
  <v-app>
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

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="100vh">
      <v-container>
        <div style="width: 90vw; height: 500px; backgroundcolor: blue"></div>
        <div style="width: 90vw; height: 500px; backgroundcolor: red"></div>
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
      <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({ value: "recent" }),
};
</script>

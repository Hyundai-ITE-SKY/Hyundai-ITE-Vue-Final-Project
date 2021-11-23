<!--컴포넌트 UI 정의-->
<template>
  <div class="mt-5 mb-5">
    <v-row class="pa-0 ma--20 justify-center">
      <v-col v-for="n in 10" :key="n" cols="5" class="pa-2">
        <!-- <v-card height="200">
          <v-img></v-img>
        </v-card> -->
        <v-card outlined to="/product/detail">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>
          <v-img
            height="200"
            src="http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_W01.jpg/dims/resize/684x1032/"
          ></v-img>
          <v-card-title class="pa-0 pl-2" style="font-size: 12px">MINE</v-card-title>
          <v-card-text class="pa-0 pl-2" style="font-size: 12px">카멜 재킷</v-card-text>
          <v-card-title class="pa-0 pl-2" style="font-size: 15px">₩ 1,350,000</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {};
  },
  //컴포넌트 메서드 정의
  methods: {},
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

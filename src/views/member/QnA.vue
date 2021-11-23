<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div class="grey pa-1">
    <v-row class="white ma-2">
      <v-col cols="4" class="pb-0">
        <v-img
            src="http://newmedia.thehandsome.com/MN/2B/FW/MN2B8WJC623WP2_LY_W01.jpg/dims/resize/684x1032/"
            contain
            height="200px"/>
      </v-col>
      <v-col cols="6" class="pt-6 pb-0">
        <v-row>
          <v-col cols="12" class="ma-0 pa-0 font-weight-black">[ProductCode] Product Name</v-col>
          <v-col cols="12" class="ma-0 pa-0 grey--text">COLOR/SIZE Black Free</v-col>
          <v-col cols="12" class="ma-0 pa-0 font-weight-black">Title</v-col>
          <v-col cols="12" class="ma-0 pa-0 grey--text">2021.11.23</v-col>
          <v-col cols="12" class="my-1 pa-0 font-weight-black orange--text">답변 완료</v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="pl-8">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-col>
      <v-col cols="12" class="px-0 pt-0 ma-0"> 
        <div style="text-align:center">
          <v-btn dark class="pa-2" width="80%">상세보기</v-btn>
        </div>
      </v-col>
      
    </v-row>
  </div>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name:"",
  //추가하고 싶은 컴포넌트를 등록
  components:{
    
  },
  //컴포넌트 데이터 정의
  data() {
    return {
    };
  },
  //컴포넌트 메서드터 정의
  methods:{
  }
}
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped>

</style>
<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div>
    <!--<div class="black" style="text-align:center;"><span class="align-center" style="font-size:15px; font-weight:bold; color:#ffffff;">주문 완료</span></div>-->
    <v-img style="height:600px;" src="https://user-images.githubusercontent.com/55488114/146708788-13006227-71ee-4806-a996-8930302fc85c.png">
     <div class="d-flex align-center" style="height: 100%;">
       <v-progress-linear
          class="mx-9"
          style="width:350px;"
          color="grey darken-1"
          indeterminate
          rounded
          height="6"></v-progress-linear>
     </div>
    </v-img>
   
  </div>
</template>
<script>
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name:"OrderSuccessComponent",
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
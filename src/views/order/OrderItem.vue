<!-- 컴포넌트 UI 정의 -->
<template>
  <div style="background-color: white">
    <div class="px-3 py-6" style="display: flex">
      <div>
          <v-img
            :src="product.cimage1"
            lazy-src="@/assets/images/event/eventloader.jpg"
            width="100px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
      </div>
      <div class="px-3">
        <div class="text-truncate" style="font-size: 0.875rem; font-weight: bolder">
          {{ product.bname }}
        </div>
        <div class="text-truncate mt-1" style="font-size: 0.875rem; color: #7c7c7c">
          {{ product.pname }}
        </div>
        <div class="text-truncate mt-1" style="font-size: 0.875rem; color: #7c7c7c">
          옵션: {{ order.ccolorcode }} {{ order.psize }}
        </div>
        <div class="text-truncate mt-3" style="font-size: 1rem; font-weight: bolder">
          {{
            (
              order.oamount *
              Math.floor((product.pprice * (100 - $store.state.product.gradeSale)) / 100)
            ).toLocaleString()
          }}<span style="font-size: 0.875rem; font-weight: bolder">원/ {{ order.oamount }}개</span>
        </div>
        <div class="mt-3" style="font-size: 0.875rem; font-weight: bolder; color: #ea7740">
          주문접수
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // component의 대표 이름(devtools에 표시되는 이름)
  name: "OrderItem",
  // 추가하고 싶은 컴포넌트를 등록
  components: {},
  // 컴포넌트 데이터 정의
  data: function () {
    return {};
  },
  // 컴포넌트 메소드 정의
  methods: {},
  created(){
    console.log("######order",this.order);
    console.log("######product",this.product);
  },
  props: {
    product: Object,
    order : Object,
  },
};
</script>

<!-- 컴포넌트 스타일 정의 -->
<style scoped></style>

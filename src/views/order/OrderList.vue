<!-- 컴포넌트 UI 정의
    주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div style="background-color: #fafafa">
    <div style="display: flex" class="justify-space-between px-6 pt-6">
      <div class="text-center" style="width: 48px; height: 48px; color: #266df6">
        <div style="font-size: 1.5rem; font-weight: bolder; color: #266df6">13</div>
        <div style="font-size: 0.7rem; color: #266df6">전체</div>
      </div>
      <div
        v-for="order of orders"
        :key="order.status"
        class="text-center"
        style="width: 48px; height: 48px; color: black"
      >
        <div :style="`font-size: 1.5rem; font-weight: bolder; color: ${getFontColor(order.value)}`">
          {{ order.value }}
        </div>
        <div style="font-size: 0.7rem">{{ order.status }}</div>
      </div>
    </div>
    <div class="mt-6 px-6">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            style="font-size: 0.875rem; font-weight: bolder"
            v-model="dateRangeText"
            label="검색 범위"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dates" range scrollable color="black" locale="ko-KR" full-width>
          <v-spacer></v-spacer>
          <v-btn text color="black" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="black" @click="$refs.menu.save(dates)"> OK </v-btn>
        </v-date-picker>
      </v-menu>
    </div>
    <div>
      <order-item
        v-for="(product, i) of products"
        :key="i"
        :inputAmount="inputAmounts[i]"
        :selectedColor="selectedColors[i]"
        :selectedSize="selectedSizes[i]"
        :product="product"
      >
      </order-item>
    </div>
  </div>
</template>
<script>
import OrderItem from "./OrderItem.vue";
export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "OrderList",
  //추가하고 싶은 컴포넌트를 등록
  components: { OrderItem },
  //컴포넌트 데이터 정의
  data() {
    return {
      dates: ["2021-11-01", "2021-12-02"],
      menu: false,
      orders: [
        { status: "결제", value: 1 },
        { status: "배송", value: 0 },
        { status: "배송완료", value: 0 },
        { status: "구매확정", value: 12 },
      ],
      selectedColors: ["SR", "WT"],
      selectedSizes: ["00", "M"],
      inputAmounts: [1, 3],
      products: [
        {
          pid: "MW2B3KTO014E6A",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "Knit",
          pno: 4092,
          pname: "[21SS] 슬리브리스 크롭 니트 탑",
          pprice: 124740,
          pdetail:
            "과감한 실루엣과 패턴이 시선을 사로 잡는 니트 탑으로 하이웨이스트의 하의와 매치하기 좋은 크롭 길이로 이루어져 있습니다. 흔히 볼 수 없는 조합의 컬러가 조화를 이루고 있으며, 같은 소재의 스커트와 셋업하여 연출할 수 있습니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3KTO014E6A",
              ccolorcode: "SR",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_C01.jpg",
              cmatchpid: "MW2B3KSC015E6A_SR",
              stocks: [
                {
                  pid: "MW2B3KTO014E6A",
                  ccolorcode: "SR",
                  ssize: "0",
                  samount: 4,
                },
                {
                  pid: "MW2B3KTO014E6A",
                  ccolorcode: "SR",
                  ssize: "00",
                  samount: 5,
                },
              ],
            },
          ],
        },
        {
          pid: "MW2B3WSH015E4A",
          bname: "CLUB MONACO",
          clarge: "WOMEN",
          cmedium: "Top",
          csmall: "Blouse",
          pno: 4162,
          pname: "[21SS] 타이 슬리브 탑",
          pprice: 112140,
          pdetail:
            "소맷단의 길게 늘어뜨린 스트랩이 포인트로 독특한 디테일이 돋보이는 탑입니다. 은은한 광택감이 있는 유연하게 흐르는 소재가 한층 세련된 분위기를 연출합니다.",
          pseason: "SS",
          ptotalamount: 0,
          colors: [
            {
              pid: "MW2B3WSH015E4A",
              ccolorcode: "NY",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_NY_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_NY_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_NY_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_NY_C01.jpg",
              cmatchpid: "MW2B1NPC001E1P_IV",
              stocks: [
                {
                  pid: "MW2B3WSH015E4A",
                  ccolorcode: "NY",
                  ssize: "M",
                  samount: 3,
                },
                {
                  pid: "MW2B3WSH015E4A",
                  ccolorcode: "NY",
                  ssize: "S",
                  samount: 4,
                },
                {
                  pid: "MW2B3WSH015E4A",
                  ccolorcode: "NY",
                  ssize: "XS",
                  samount: 5,
                },
              ],
            },
            {
              pid: "MW2B3WSH015E4A",
              ccolorcode: "WT",
              cimage1:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_WT_W01.jpg/dims/resize/684x1032/",
              cimage2:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_WT_W02.jpg/dims/resize/684x1032/",
              cimage3:
                "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_WT_W03.jpg/dims/resize/684x1032/",
              ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3WSH015E4A_WT_C01.jpg",
              cmatchpid: "MW2B3WSC014E5E_PK",
              stocks: [
                {
                  pid: "MW2B3WSH015E4A",
                  ccolorcode: "WT",
                  ssize: "M",
                  samount: 4,
                },
                {
                  pid: "MW2B3WSH015E4A",
                  ccolorcode: "WT",
                  ssize: "S",
                  samount: 4,
                },
                {
                  pid: "MW2B3WSH015E4A",
                  ccolorcode: "WT",
                  ssize: "XS",
                  samount: 4,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    getFontColor(value) {
      if (value > 0) {
        return "black";
      }
      return "#A3A3A3";
    },
  },
  created() {
    if (this.$store.getters["login/getUserId"] === "") {
      this.$router.push("/login");
    }
    this.$store.commit("gnb/setCurrentPage", "orderlist");
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>
<!--scoped : 지역변수, 없으면 전역 style이 된다. 붙이는게 좋다
    컴포넌트 스타일-->
<style scoped></style>

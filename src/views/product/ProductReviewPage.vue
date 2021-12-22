<!-- 컴포넌트 UI 정의 주의할 점 : 루트 Element가 하나만 있어야한다. -->
<template>
  <div class="px-3 py-1" style="background-color: #fafafa">
    <div class="d-flex">
      <div class="mt-4">
        <v-img :src="pimage" lazy-src="@/assets/images/event/eventloader.jpg" width="160px">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
      <div class="mt-4 pl-3 text-truncate">
        <div class="d-flex" style="font-size: 0.875rem">
          <div style="font-weight: bolder; width: 40px">상품</div>
          <div>{{ pname }}</div>
        </div>
        <div class="d-flex" style="font-size: 0.875rem">
          <div style="font-weight: bolder; width: 40px">옵션</div>
          <div>{{ pcolor }} / {{ psize }}</div>
        </div>
        <div class="mt-2 mb-3 text-center">
          <v-rating
            background-color="orange lighten-3"
            color="orange"
            v-model="rate"
            class="pa-0"
            dense
            :size="35"
          ></v-rating>
        </div>
        <div>
          <div class="mb-1" style="font-size: 0.7rem; font-weight: bolder">가격은 적당했나요?</div>
          <v-select
            dense
            solo
            v-model="selectPrice"
            :items="priceItems"
            item-text="state"
            item-value="value"
            label="가성비"
            return-object
            single-line
            style="font-size: 0.7rem"
            hide-details="auto"
          ></v-select>
        </div>
        <div class="mt-4">
          <div class="mb-1" style="font-size: 0.7rem; font-weight: bolder">착용감은 어떤가요?</div>
          <v-select
            dense
            solo
            v-model="selectComfortable"
            :items="comfortableItems"
            item-text="state"
            item-value="value"
            label="착용감"
            return-object
            single-line
            style="font-size: 0.7rem"
            hide-details="auto"
          ></v-select>
        </div>
      </div>
    </div>
    <div>
      <div class="mt-4 mb-1" style="font-size: 0.7rem; font-weight: bolder">
        상품 품질에 대한 한줄평을 남겨주세요.
      </div>
      <div>
        <v-text-field
          style="font-size: 0.7rem"
          solo
          filled
          v-model="rtitle"
          dense
          hide-details="auto"
        ></v-text-field>
      </div>
      <div class="mt-4 mb-1" style="font-size: 0.7rem; font-weight: bolder">
        상품 품질에 대한 경험을 남겨주세요.
      </div>
      <div>
        <v-textarea
          style="font-size: 0.7rem"
          dense
          solo
          filled
          v-model="rcontent"
          hide-details="auto"
        ></v-textarea>
      </div>
    </div>
    <div class="text-center mt-5 mb-6">
      <v-btn
        style="font-size: 0.7rem; font-weight: bolder"
        depressed
        color="primary"
        small
        @click="saveReview()"
        :loading="loadingState"
      >
        저장
      </v-btn>
    </div>
  </div>
</template>
<script>
import apiMember from "@/apis/member";
import apiProduct from "@/apis/product";

export default {
  //component의 대표 이름(devTools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트를 등록
  components: {},
  //컴포넌트 데이터 정의
  data: () => ({
    member: { mid: "", mname: "" },
    loadingState: false,
    pid: "",
    pname: "",
    pcolor: "",
    psize: "",
    pimage: "",
    rate: 0,
    rtitle: "",
    rcontent: "",
    selectPrice: { state: "만족해요", value: 0 },
    priceItems: [
      { state: "만족해요", value: 0 },
      { state: "적당해요", value: 1 },
      { state: "비싸요", value: 2 },
    ],
    selectComfortable: { state: "편안해요", value: 0 },
    comfortableItems: [
      { state: "편안해요", value: 0 },
      { state: "적당해요", value: 1 },
      { state: "불편해요", value: 2 },
    ],
  }),
  //컴포넌트 메서드 정의
  methods: {
    saveReview() {
      this.loadingState = true;

      const formData = new FormData();
      formData.append("mid", this.member.mid);
      formData.append("mname", this.member.mname);
      formData.append("pid", this.pid);
      formData.append("pname", this.pname);
      formData.append("pcolor", this.pcolor);
      formData.append("psize", this.psize);
      formData.append("rrate", this.rate);
      formData.append("rprice", this.selectPrice.value);
      formData.append("rcomfortable", this.selectComfortable.value);
      formData.append("rtitle", this.rtitle);
      formData.append("rcontent", this.rcontent);

      apiProduct
        .createReview(formData)
        .then((response) => {
          console.log(response.data);
          this.moveProductDetail(this.pid);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMember() {
      try {
        const response = await apiMember.getMember();
        this.member = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    moveProductDetail(pid) {
      this.$router.push(`/product/detail?pid=${pid}`).catch(() => {});
    },
  },
  created() {
    this.loadingState = false;
    this.getMember();
    this.$store.commit("gnb/setCurrentPage", "productreview");
    this.pimage = this.$store.getters["product/getReviewImage"];
    this.pid = this.$route.query.pid;
    this.pname = this.$route.query.pname;
    this.pcolor = this.$route.query.pcolor;
    this.psize = this.$route.query.psize;
  },
};
</script>
<style scoped></style>

<!--컴포넌트 UI 정의-->
<template>
  <div>
    <div>
      <v-breadcrumbs :items="category" class="justify-center">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div>
      <v-row no-gutters>
        <v-col align-self="auto" v-for="item in products" :key="item.pno" cols="6">
          <div class>
            <product-item
              :bname="item.bname"
              :pname="item.pname"
              :pprice="item.pprice"
              :colors="item.colors"
            ></product-item>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-container class="max-width">
              <v-pagination
                v-model="pageNo"
                class="my-4"
                :length="50"
                circle
                color="black"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
import apiProduct from "@/apis/product";

export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: { ProductItem },
  //컴포넌트 데이터 정의
  data() {
    return {
      pageNo: 1,
      products: [],
      category: [
        {
          text: "대분류",
          disabled: false,
          href: "list",
        },
        {
          text: "중분류",
          disabled: false,
          href: "list",
        },
        {
          text: "소분류",
          disabled: true,
          href: "list",
        },
      ],
    };
  },
  //컴포넌트 메서드 정의
  methods: {},
  created() {
    apiProduct
      .getProductList()
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    pageNo: function () {
      apiProduct
        .getProductList(this.pageNo)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

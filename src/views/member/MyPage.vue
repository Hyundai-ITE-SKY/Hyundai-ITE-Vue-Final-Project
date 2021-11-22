<!--컴포넌트 UI 정의-->
<template>
  <v-card class="mx-auto" outlined>
    <v-list-item>
      <v-list-item-avatar tile size="60" color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <div class="text-overline mb-2">lv.1</div>
        <v-list-item-title class="text-h5 mb-3"> 서민철 </v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
      <v-card-actions>
        <v-btn outlined rounded text>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-card-actions>
    </v-list-item>
    <v-list-item class="justify-space-between mb-13">
      <v-card width="150">
        <v-card-title>포인트</v-card-title>
        <v-card-subtitle>1,170P</v-card-subtitle>
      </v-card>
      <v-card width="150">
        <v-card-title>쿠폰</v-card-title>
        <v-card-subtitle>0 개</v-card-subtitle>
      </v-card>
    </v-list-item>
    <!--q&a, 개인정보 수정, 찜, 취소/반품-->
    <div class="mb-11">
      <div class="d-flex justify-center">
        <v-card width="150" outlined>
          <v-card-title class="justify-center"><v-icon>mdi-help-circle-outline</v-icon></v-card-title>
          <v-card-subtitle class="text-center">Q&A</v-card-subtitle>
        </v-card>
        <v-card width="150" outlined>
          <v-card-title class="justify-center"><v-icon>mdi-account-edit-outline</v-icon></v-card-title>
          <v-card-subtitle class="text-center">개인정보 수정</v-card-subtitle>
        </v-card>
      </div>
      <div class="d-flex justify-center">
        <v-card width="150" outlined>
          <v-card-title class="justify-center"><v-icon>mdi-heart-outline</v-icon></v-card-title>
          <v-card-subtitle class="text-center">찜</v-card-subtitle>
        </v-card>
        <v-card width="150" outlined>
          <v-card-title class="justify-center"><v-icon>mdi-archive-cancel-outline</v-icon></v-card-title>
          <v-card-subtitle class="text-center">취소/반품</v-card-subtitle>
        </v-card>
      </div>
    </div>
  </v-card>
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

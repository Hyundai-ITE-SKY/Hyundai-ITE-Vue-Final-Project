<!--컴포넌트 UI 정의-->
<template>
  <v-form ref="form" v-model="valid" class="ml-6 mr-6" lazy-validation>
    <div class="mb-7">
      <v-text-field v-model="id" :counter="10" :rules="idRules" label="ID" required> </v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
    </div>
    <v-btn width="100%" color="blue-grey darken-4" dark class="mb-5">로그인</v-btn>
    <v-btn width="100%" color="yellow accent-4">카카오 로그인</v-btn>
  </v-form>
</template>

<script>
export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  //컴포넌트 메서드 정의
  methods: {},
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

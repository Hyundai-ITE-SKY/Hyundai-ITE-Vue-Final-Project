<!--컴포넌트 UI 정의-->
<template>
  <v-form ref="form" v-model="valid" class="ml-6 mr-6 mt-5" lazy-validation>
    <div class="mb-7">
      <v-text-field
        v-model="user.id"
        :counter="10"
        :rules="[idRules.required, idRules.min]"
        label="ID"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="user.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[pwdRules.required, pwdRules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
    </div>
    <v-btn width="100%" color="blue-grey darken-4" dark class="mb-5" @click="handleLogin"
      >로그인</v-btn
    >
    <v-btn width="100%" color="yellow accent-4">카카오 로그인</v-btn>
  </v-form>
</template>

<script>
import auth from "@/apis/auth";
import apiMember from "@/apis/member";
export default {
  //컴포넌트의 대표 이름(devtools에 나오는 이름)
  name: "",
  //추가하고 싶은 컴포넌트 등록
  components: {},
  //컴포넌트 데이터 정의
  data() {
    return {
      valid: false,
      show1: false,
      pwdRules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 5 || "Min 5 characters",
      },
      idRules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 3 || "Min 3 characters",
      },
      user: {
        id: "mid1",
        password: "12345",
      },
    };
  },
  //컴포넌트 메서드 정의
  methods: {
    async handleLogin() {
      try {
        const response = await auth.login(this.user);

        this.$store.dispatch("login/saveAuth", {
          userId: response.data.mid,
          authToken: response.data.jwt,
        });

        const wishlist = await apiMember.getWishList();
        this.$store.commit("product/setUserWishList", wishlist.data);
        this.$router.push("/member/mypage");
      } catch (err) {
        try {
          if (err.response.status === 401) {
            console.log("로그인 실패(아이디 또는 비밀번호가 틀림)");
          } else {
            console.log("로그인 실패(알 수 없는 이유)");
          }
        } catch (e) {
          console.log("로그인 실패(네트워크 오류)");
        }
      }
    },
  },
  created() {
    this.$store.commit("gnb/setCurrentPage", "login");
  },
};
</script>
<!--컴포넌트 스타일 정의-->
<style scoped></style>

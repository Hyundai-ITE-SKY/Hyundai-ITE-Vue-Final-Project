import Vue from "vue";
import VueRouter from "vue-router";
import home from "./home";
import member from "./member";
import product from "./product";
import order from "./order";

Vue.use(VueRouter);

const routes = [...home, ...product, ...member, ...order];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

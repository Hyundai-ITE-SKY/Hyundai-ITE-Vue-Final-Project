import Vue from "vue";
import VueRouter from "vue-router";
import home from "./home";
import member from "./member";
import product from "./product";
import order from "./order";
import event from "./event";


Vue.use(VueRouter);

const routes = [...home, ...product, ...member, ...order, ...event];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

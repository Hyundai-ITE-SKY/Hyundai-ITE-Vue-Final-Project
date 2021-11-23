export default [
  {
    path: "/order",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/Order"),
  },
  {
    path: "/order/success",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/OrderSuccess"),
  },
];
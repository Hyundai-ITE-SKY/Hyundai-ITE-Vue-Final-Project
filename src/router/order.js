export default [
  {
    path: "/order/list",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/OrderList"),
  },
];

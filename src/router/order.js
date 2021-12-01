export default [
  {
    path: "/order/order",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/Order"),
    
  },
  {
    path: "/order/list",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/OrderList"),
  },
  {
    path: "/order/success",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/OrderSuccess"),
  },
  {
    path: "/order/detail",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/OrderDetail"),
  },
];

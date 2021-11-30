export default [
  {
    path: "/order/order",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/Order"),
    props: (route) => ({//(route) 사용하면 url이 실행된 이후에 실행된다.
      oid: route.query.oid,
    }),
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

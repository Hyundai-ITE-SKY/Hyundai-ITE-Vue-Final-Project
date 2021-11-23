export default [
  {
    path: "/product/list",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductList"),
  },
  {
    path: "/product/detail",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductDetail"),
  },
];

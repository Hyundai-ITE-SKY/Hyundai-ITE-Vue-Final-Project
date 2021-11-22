export default [
  {
    path: "/product",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductList"),
  },
  // {
  //   path: "/productdetail",
  //   component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductDetail"),
  // },
];

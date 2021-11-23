export default [
  {
    path: "/product",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductList"),
  },
  {
    path: "/product/detail",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductDetail"),
  },
];

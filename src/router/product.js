export default [
  {
    path: "/product",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/Product"),
  },
  {
    path: "/product/detail",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductDetail"),
  },
];

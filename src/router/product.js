export default [
  {
    path: "/product/list",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductList"),
  },
  {
    path: "/product/detail",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductDetail"),
  },
  {
    path: "/product/review",
    component: () => import(/* webpackChunkName: "product" */ "../views/product/ProductReviewPage"),
  },
];

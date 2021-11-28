export default [
  {
    path: "/home/main",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/MainPage"),
  },
];

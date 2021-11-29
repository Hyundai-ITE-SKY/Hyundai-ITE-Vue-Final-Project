export default [
  {
    path: "/home/main",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/MainPage"),
  },
  {
    path: "/home/eventdetail",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/EventDetail"),
  },
];

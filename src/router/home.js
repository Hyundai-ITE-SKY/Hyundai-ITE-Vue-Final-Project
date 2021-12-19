export default [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/MainPage"),
  },
  {
    path: "/home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/MainPage"),
  },
  {
    path: "/home/eventdetail",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/EventDetail"),
  },
];

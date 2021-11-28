export default [
  {
    path: "/home/event",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/Event"),
  },
  {
    path: "/home/newproduct",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/NewProduct"),
  },
  {
    path: "/home/bestproduct",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/BestProduct"),
  },
  {
    path: "/home/eventdetail",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/EventDetail"),
  },
];

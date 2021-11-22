export default [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/Home"),
  },
];
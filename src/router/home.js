export default [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/Home"),
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: "home" */ "../views/home/Login"),
  },
];
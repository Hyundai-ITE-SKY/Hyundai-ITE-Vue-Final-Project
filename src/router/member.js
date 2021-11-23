export default [
  {
    path: "/member/mypage",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/MyPage"),
  },
  {
    path: "/member/wishlist",
    component: () => import(/* webpackChunkName: "member" */ "../views/member/WishList"),
  },
];

export default [
  {
    path: "/event/eventdetail",
    component: () => import(/* webpackChunkName: "event" */ "../views/home/EventDetail"),
    props: (route) => ({//(route) 사용하면 url이 실행된 이후에 실행된다.
      eno: route.query.eno,
    }),
  },
  
];
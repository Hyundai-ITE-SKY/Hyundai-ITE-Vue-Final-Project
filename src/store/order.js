export default {
  // 모듈의 이름을 루트 하위 네임스페이스로 설정
  namespaced: true,
  // 상태 정의
  state: { 
    order: {},
    orderItems: [],
   },
  // 상태값을 읽는 메소드 정의(Getter)
  getters: {
    getOrder(state) {
      return state.order;
    },
    getOrderItems(state) {
      return state.orderItems;
    },
  },
  // 상태값을 변경하는 동기 메소드 정의(Setter)
  mutations: {
    setOrder(state, payload) {
      state.order = payload;
    },
    setOrderItems(state, payload) {
      state.orderItems = payload;
    },
  },
  // 상태값을 변경하는 비동기 메소드 정의(Setter)
  actions: {},
};

export default {
  // 모듈의 이름을 루트 하위 네임스페이스로 설정
  namespaced: true,
  // 상태 정의
  state: { mainPage: "EVENT", currentPage: "main" },
  // 상태값을 읽는 메소드 정의(Getter)
  getters: {
    getMainPage(state) {
      return state.mainPage;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
  // 상태값을 변경하는 동기 메소드 정의(Setter)
  mutations: {
    // payload는 외부에서 받는 값을 의미한다.
    setMainPage(state, payload) {
      state.mainPage = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
  },
  // 상태값을 변경하는 비동기 메소드 정의(Setter)
  actions: {},
};

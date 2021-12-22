export default {
  // 모듈의 이름을 루트 하위 네임스페이스로 설정
  namespaced: true,
  // 상태 정의
  state: {
    gradeSale: 20,
    userWishList: [],
    category: ["none", "none", "none"],
    selectedProduct: {
      pid: "MW2B3KTO014E6A",
      bname: "CLUB MONACO",
      clarge: "WOMEN",
      cmedium: "Top",
      csmall: "Knit",
      pno: 4092,
      pname: "[21SS] 슬리브리스 크롭 니트 탑",
      pprice: 124740,
      pdetail:
        "과감한 실루엣과 패턴이 시선을 사로 잡는 니트 탑으로 하이웨이스트의 하의와 매치하기 좋은 크롭 길이로 이루어져 있습니다. 흔히 볼 수 없는 조합의 컬러가 조화를 이루고 있으며, 같은 소재의 스커트와 셋업하여 연출할 수 있습니다.",
      pseason: "SS",
      ptotalamount: 0,
      colors: [
        {
          pid: "MW2B3KTO014E6A",
          ccolorcode: "SR",
          cimage1:
            "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_W01.jpg/dims/resize/684x1032/",
          cimage2:
            "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_W02.jpg/dims/resize/684x1032/",
          cimage3:
            "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_W03.jpg/dims/resize/684x1032/",
          ccolorimage: "http://newmedia.thehandsome.com/MW/2B/SS/MW2B3KTO014E6A_SR_C01.jpg",
          cmatchpid: "MW2B3KSC015E6A_SR",
          stocks: [
            {
              pid: "MW2B3KTO014E6A",
              ccolorcode: "SR",
              ssize: "0",
              samount: 4,
            },
            {
              pid: "MW2B3KTO014E6A",
              ccolorcode: "SR",
              ssize: "00",
              samount: 5,
            },
          ],
        },
      ],
    },
    sizeList: {},
    colorList: [],
    reviewImage: "",
  },
  // 상태값을 읽는 메소드 정의(Getter)
  getters: {
    getSelectedProduct(state) {
      return state.selectedProduct;
    },
    getUserWishList(state) {
      return state.userWishList;
    },
    getCategory(state) {
      return state.category;
    },
    getSizeList(state) {
      return state.sizeList;
    },
    getColorList(state) {
      return state.colorList;
    },
    getGradeSale(state) {
      return state.gradeSale;
    },
    getReviewImage(state) {
      return state.reviewImage;
    },
  },
  // 상태값을 변경하는 동기 메소드 정의(Setter)
  mutations: {
    // payload는 외부에서 받는 값을 의미한다.
    setSelectedProduct(state, payload) {
      state.selectedProduct = payload;
    },
    setUserWishList(state, payload) {
      state.userWishList = payload;
    },
    setCategory(state, payload) {
      state.category = payload;
    },
    setSizeList(state, payload) {
      state.sizeList = payload;
    },
    setColorList(state, payload) {
      state.colorList = payload;
    },
    setGradeSale(state, payload) {
      state.gradeSale = payload;
    },
    setReviewImage(state, payload) {
      state.reviewImage = payload;
    },
  },
  // 상태값을 변경하는 비동기 메소드 정의(Setter)
  actions: {},
};

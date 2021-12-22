import axios from "axios";

function getCategory(clarge) {
  return axios.get(`/category/${clarge}`);
}

function getProduct(pid) {
  const promise = axios.get(`http://kosa1.iptime.org:50202/product/${pid}`);
  return promise;
}

function getProductList(large, medium, small, pageNo = 1) {
  if (small !== "none") {
    return axios.get(
      `http://kosa1.iptime.org:50202/productlist/${large}/${medium}/${small}/${pageNo}`,
    );
  } else if (medium !== "none") {
    return axios.get(`http://kosa1.iptime.org:50202/productlist/${large}/${medium}/${pageNo}`);
  } else {
    return axios.get(`http://kosa1.iptime.org:50202/productlist/${large}/${pageNo}`);
  }
}

function getProductInfo(pid, colorcode) {
  const promise = axios.get(`http://kosa1.iptime.org:50202/product/info/${pid}/${colorcode}`);
  return promise;
}

function getBestProductList(large, medium) {
  if (medium !== "전체보기") {
    return axios.get(`http://kosa1.iptime.org:50202/productlist/best/${large}/${medium}`);
  } else {
    return axios.get(`http://kosa1.iptime.org:50202/productlist/best/${large}`);
  }
}

function getNewProductList(large, medium) {
  if (medium !== "전체보기") {
    return axios.get(`http://kosa1.iptime.org:50202/productlist/new/${large}/${medium}`);
  } else {
    return axios.get(`http://kosa1.iptime.org:50202/productlist/new/${large}`);
  }
}

function updateStock(stock) {
  const promise = axios.post(`http://kosa1.iptime.org:50202/product/updatestock`, stock);
  return promise;
}

function createReview(review) {
  const promise = axios.post(`http://kosa1.iptime.org:50202/product/review/create`, review);
  return promise;
}

function getReview(pid) {
  const promise = axios.get(`http://kosa1.iptime.org:50202/product/review?pid=${pid}`);
  return promise;
}

function getExhibition(){
  const promise = axios.get(`http://kosa1.iptime.org:50202/product/exhibition/list`);
  return promise;
}

export default {
  getCategory,
  getProduct,
  getProductList,
  getProductInfo,
  getBestProductList,
  getNewProductList,
  updateStock,
  createReview,
  getReview,
  getExhibition,
};

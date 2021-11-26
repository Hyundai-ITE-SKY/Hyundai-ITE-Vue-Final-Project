import axios from "axios";

function getCategory(clarge) {
  return axios.get(`/category/${clarge}`);
}

function getProduct(pid) {
  const promise = axios.get(`http://kosa1.iptime.org:50202/product/${pid}`);

  return promise;
}

function getProductList(pageNo = 1) {
  return axios.get(`http://kosa1.iptime.org:50202/productlist/WOMEN/${pageNo}`);
}

export default {
  getCategory,
  getProduct,
  getProductList,
};

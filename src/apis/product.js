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

export default {
  getCategory,
  getProduct,
  getProductList,
};

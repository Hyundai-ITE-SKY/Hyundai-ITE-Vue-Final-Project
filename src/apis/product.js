import axios from "axios";

function getProductList(pageNo = 1) {
  return axios.get(`http://kosa1.iptime.org:50202/productlist/WOMEN/${pageNo}`);
}

export default {
  getProductList,
};

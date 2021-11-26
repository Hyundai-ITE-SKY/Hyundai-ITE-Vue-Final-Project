import axios from "axios";

function getProduct(pid) {
  //http://kosa1.iptime.org:50202/product/PL2B7WSC004W
  const promise = axios.get(`http://kosa1.iptime.org:50202/product/${pid}`);

  return promise;
}

export default {
  getProduct,
}

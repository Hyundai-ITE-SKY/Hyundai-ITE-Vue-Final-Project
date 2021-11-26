import axios from "axios";

function getCategory(clarge){
  return axios.get(`/category/${clarge}`);
}

export default {
  getCategory
}
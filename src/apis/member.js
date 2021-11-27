import axios from "axios";

function getMember(){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/info");
  return promise;
}

function getCoupon(){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/coupon");
  return promise;
}

function getWishList(){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/wishlist");  
  return promise;
}

export default{
  getMember,
  getWishList,
  getCoupon,
}
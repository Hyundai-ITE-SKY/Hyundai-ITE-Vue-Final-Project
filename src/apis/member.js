import axios from "axios";

function getMember(){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/info");
  return promise;
}

function getCoupon(){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/coupon");
  return promise;
}

function getWishList(mid){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/wishlist", {params:{mid: mid}});  
  return promise;
}

function getCart(mid){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/mycart", {params:{mid:mid}});
  return promise;
}

export default{
  getMember,
  getWishList,
  getCoupon,
  getCart
}
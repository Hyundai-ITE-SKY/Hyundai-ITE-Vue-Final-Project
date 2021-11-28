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

function getCart(mid){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/mycart", {params:{mid:mid}});
  return promise;
}

function createWishList(pid){
  const promise = axios.post("http://kosa1.iptime.org:50207/member/createwishlist", `pid=${pid}`);
  return promise;
}

function deleteWishList(pid){
  const promise = axios.delete("http://kosa1.iptime.org:50207/member/deletewishlist", {params:{pid:pid}});
  return promise;
}

export default{
  getMember,
  getWishList,
  getCoupon,
  getCart,
  createWishList,
  deleteWishList,
}
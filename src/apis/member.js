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

function getCart(){
  const promise = axios.get("http://kosa1.iptime.org:50207/member/mycart");
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

function createCoupon(eid, ename, cname){
  const promise = axios.post("http://kosa1.iptime.org:50207/member/createcoupon", `eid=${eid}&ename=${ename}&cname=${cname}`);
  return promise;
}

function deleteCartitem(pid, pcolor, psize){
  const promise = axios.delete(`http://kosa1.iptime.org:50207/member/${pid}/${pcolor}_${psize}`);
  return promise;
}

function updateCartitem(formData){
  const promise = axios.post('http://kosa1.iptime.org:50207/member/update', formData);
  return promise;
}

export default{
  getMember,
  getWishList,
  getCoupon,
  getCart,
  createWishList,
  deleteWishList,
  createCoupon,
  deleteCartitem,
  updateCartitem
}
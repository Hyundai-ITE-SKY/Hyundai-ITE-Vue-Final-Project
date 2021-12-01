import axios from "axios";

function getOrderState(mid){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/orderstate?mid=${mid}`);
  return promise;
}

function getOrderListItem(oid){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/orderlist/${oid}`);
  return promise;
}

function getOrderList(){
  const promise = axios.get(`http://kosa1.iptime.org:50211/order/orderlist`);
  return promise;
}

export default{
  getOrderState,
  getOrderListItem,
  getOrderList
}
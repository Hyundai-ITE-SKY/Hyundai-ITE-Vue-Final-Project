import axios from "axios";

function getEvent(eid){
  const promise = axios.get(`http://kosa1.iptime.org:50207/event/${eid}`);
  return promise;
}

export default{
  getEvent,
}
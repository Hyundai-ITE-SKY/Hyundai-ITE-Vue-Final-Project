import axios from "axios";

function getEvent(eid){
  const promise = axios.get(`http://kosa1.iptime.org:50207/event/${eid}`);
  return promise;
}

function updateEvent(eventFormData){
  const promise = axios.post("http://kosa1.iptime.org:50207/event", eventFormData);
  return promise;
}

function getEvents(){
  const promise = axios.get(`http://localhost/event/list`);
  return promise;
}

export default{
  getEvent,
  updateEvent,
  getEvents,
}
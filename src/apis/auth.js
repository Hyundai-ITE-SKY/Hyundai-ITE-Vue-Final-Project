import axios from "axios";

function join(user) {
  // axios의 모든 메소드는 promise를 return 한다.
  return axios.post("member/join", {
    mid: user.id,
    mname: user.name,
    mpassword: user.password,
    mrole: user.role,
    memail: user.email,
  });
}

function login(user) {
  return axios.post("login", `mid=${user.id}&mpassword=${user.password}`);
}

export default {
  join,
  login,
};

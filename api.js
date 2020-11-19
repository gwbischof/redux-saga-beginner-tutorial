import axios from "axios";

export function getRoot() {
  return axios.get(`http://127.0.0.1:8000/root`)
};

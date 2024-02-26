import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000/",
  // baseURL: "https://localhost:9000/",
  baseURL: "https://192.168.0.131:9000/",
  timeout: 2000,
});

export default instance;

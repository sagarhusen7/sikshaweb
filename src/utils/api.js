import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
  withCredentials: false, // true only if using cookies (we're using JWT tokens instead)
});

export default API;

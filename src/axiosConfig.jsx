import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:6063/api", //back end url
 
});
export default axiosBase;
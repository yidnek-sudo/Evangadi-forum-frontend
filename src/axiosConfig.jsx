import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:6063/api", 

  baseURL:"https://evangadi-forum-backend-1-wb11.onrender.com/api",
 
});
export default axiosBase;
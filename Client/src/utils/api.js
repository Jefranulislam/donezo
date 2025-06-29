import axios from "axios";
const api = axios.create({
baseURL: "https://donezo-backend-navy.vercel.app/api",
  withCredentials: true,
});
export default api;
import axios from "axios";
const api = axios.create({
baseURL: "https://donezo-rhdm.vercel.app/",
  withCredentials: true,
});
export default api;
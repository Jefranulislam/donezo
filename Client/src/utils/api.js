import axios from "axios";
// Set this to your deployed backend API URL, not the frontend Vercel URL
const api = axios.create({
  baseURL: "https://donezo-rhdm.vercel.app/", // <-- replace with your actual backend URL if different
  withCredentials: true,
});
export default api;
import axios from "axios";

const api = axios.create({
    baseURL : "https://ecommerce-fullstack-design-backend-mauve.vercel.app/api"
});

export default api;
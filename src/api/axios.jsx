import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://rentezy.homes',
    // baseURL: 'http://127.0.0.1:8001',
    withCredentials: true,
});

export default axiosInstance;
import axios, { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid'

const axiosConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
}

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {
    const requestId = uuidv4();
    config.headers['X-Request-ID'] = requestId;
    return config;
}, (error) => {
    return Promise.reject(error);
})

export default axiosInstance;
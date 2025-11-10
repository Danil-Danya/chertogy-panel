import axios from "axios";

import convertKeysToCamelCase from '@/utils/convertKeysToCamelCase.js';
import convertToSnakeCase from "@/utils/convertToSnakeCase";
import convertFormDataToSnakeCase from "@/utils/convertFormDataToSnakeCase";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 5000
});

api.interceptors.response.use((response) => {
    if (response.data) {
        response.data = convertKeysToCamelCase(response.data);
    }
    
    return response;
});

api.interceptors.request.use((request) => {
    if (request.data instanceof FormData) {
        request.data = convertFormDataToSnakeCase(request.data);
    }
    else if (request.data) {
        request.data = convertToSnakeCase(request.data);
    }

    // if (request.params) {
    //     request.params = convertToSnakeCase(request.params);
    // }

    if (localStorage.getItem('accessToken')) {
        request.headers = {
            ...request.headers,
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }

    return request;
})

export default api;
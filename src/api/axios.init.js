import axios from "axios";
import convertKeysToCamelCase from '@/'

const api = axios.create({
    baseURL: '',
    timeout: 5000
});

api.interceptors.response.use((response) => {
    if (response.data) {
        response.data = convertKeysToCamelCase(response.data);
    }
    
    return response;
});

api.interceptors.request.use((request) => {
    if (request.data) {
        request.data = convertToSnakeCase(request.data);
    }

    return request;
})
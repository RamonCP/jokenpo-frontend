import axios from 'axios'

import { getToken } from '../config/auth'

const api = axios.create({
    baseURL: 'https://jokenpo-back-end.herokuapp.com/'
})

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});

export default api
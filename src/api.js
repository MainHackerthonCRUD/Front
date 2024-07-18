import axios from 'axios';

const api = axios.create ({
    baseURL: 'https://obspital.shop/',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},

});

export default api;
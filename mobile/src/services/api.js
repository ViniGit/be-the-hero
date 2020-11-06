import axios from 'axios';

api = axios.create({
    baseURL:'http://192.168.1.116:19000'
});

export default api;
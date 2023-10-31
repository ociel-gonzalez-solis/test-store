import axios from 'axios';

const soulisStoreApi = axios.create({
    baseURL: '/api'
});

export default soulisStoreApi;
import axios from 'axios';

const cryptoApi = axios.create({
    baseURL: 'https://api.coinlore.net/api'
});

export default cryptoApi;

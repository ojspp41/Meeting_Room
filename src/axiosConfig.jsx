// axiosConfig.jsx
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://csiereserve.store/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
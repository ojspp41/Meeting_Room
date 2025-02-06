import axios from 'axios';

const axiosCookie = axios.create({
  baseURL: 'https://csiereserve.store',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 자동 포함
});

export default axiosCookie;

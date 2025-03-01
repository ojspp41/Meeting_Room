import axios from 'axios';

const axiosCookie = axios.create({
  baseURL: 'https://csiereserve.store',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터: 요청마다 Authorization 헤더 추가
axiosCookie.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // ✅ 로컬스토리지에서 토큰 가져오기
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`; // ✅ 헤더에 추가
      console.log("📌 요청에 추가된 Access Token:", accessToken);
    } else {
      console.warn("❌ Access Token이 없습니다.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosCookie;

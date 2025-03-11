import axios from 'axios';

const API_KEY = 'fCJakuQ0sFclH5aO6oBvO%2F6QbeY9hdibwS%2FJWTVK01CTpWLOxGLZh%2BJPLjPCgoiCsRRD3dk1s6WQv6ZEBC%2Fpcg%3D%3D'; 
const BASE_URL = 'http://apis.data.go.kr/B410001/holiday';

/**
 * 공휴일 데이터를 가져오는 함수
 * @param {number} year - 조회할 연도
 * @returns {Promise<string[]>} - 공휴일 목록 (MM-DD 형식의 배열)
 */
export const fetchHolidays = async (year) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        serviceKey: API_KEY,
        year: year,
        _type: 'json',
        search1: 'KR',  // 대한민국 국가 코드 추가
      },
    });

    const items = response.data?.response?.body?.items?.item || [];
    return items.map(item => {
      const date = new Date(item.locdate);
      return `${date.getMonth() + 1}-${date.getDate()}`; // MM-DD 형식
    });
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
};

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // 로컬스토리지에서 accessToken과 expiresAt 확인
  const accessToken = localStorage.getItem('accessToken');
  const expiresAt = localStorage.getItem('expiresAt');

  const currentTime = Date.now();

  // accessToken이 없거나 만료 시간이 지난 경우 홈(/)으로 리디렉션
  if (!accessToken || !expiresAt || currentTime > Number(expiresAt)) {
    // 토큰 만료 또는 토큰이 없으면 로컬스토리지에서 제거하고 홈으로 리디렉션
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
    return <Navigate to="/" replace />;
  }

  // accessToken이 있고 만료 시간이 지나지 않은 경우, 자식 요소를 렌더링
  return <Outlet />;
};

export default PrivateRoute;

import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // 로컬스토리지에서 accessToken 확인
  const accessToken = localStorage.getItem('accessToken');

  // accessToken이 없으면 홈(/) 페이지로 리디렉션
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  // accessToken이 있으면 자식 요소 (즉, 해당 Route) 렌더링
  return <Outlet />;
};

export default PrivateRoute;

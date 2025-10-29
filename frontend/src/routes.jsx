
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../src/components/contexts/AuthContext';

export function RequireAuth() {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  if (!isLoggedIn) {
    return (<>
    <Navigate to="/auth" replace state={{ from: location }} />
    </>);
  }

// 認証済みならRouteにWrapされているコンポネントを表示する
  return <Outlet />;
}

export function GuestOnly() {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet/>
}
// ProtectedRoute.jsx
import Nav from '../Components/Nav';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute() {
  const { user } = useAuth();
  
  // Check 1: Is anyone logged in?
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in → render the matched child route via <Outlet />
  return (
    <>
      <Nav/>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
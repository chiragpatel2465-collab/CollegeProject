
import { useAuth } from './AuthContext'
import { Navigate , Outlet} from 'react-router-dom';
import StudentSidebar from '../Components/StudentSidebar';

const RoleRoute = ({allowedRole}) => {
    const {user} = useAuth();
  if(!user) return <Navigate to="/" replace />;
  
   if (user.role !== allowedRole) {
    // Send them to their own dashboard
    const fallback = user.role === "faculty"
      ? "/faculty"
      : "/student";
    return <Navigate to={fallback} replace />;
  }
 
  return <Outlet className="mt-20"/>;
}

export default RoleRoute
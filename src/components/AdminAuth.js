import { Navigate } from 'react-router-dom';
const AdminAuth = ({ isLoggedIn, userType, children, isVerified }) => {
  if (isLoggedIn && userType == 1) {
    if (!isVerified) {
      return <Navigate to="/verify" replace />;
    }
    return children;
  }
  return <Navigate to="/403-forbidden" replace />;
};
export default AdminAuth;

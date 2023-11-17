import { Navigate } from 'react-router-dom';
const Protected = ({ isLoggedIn, userType, children, isVerified }) => {
  if (isLoggedIn && userType == 0) {
    if (!isVerified) {
      return <Navigate to="/verify" replace />;
    }
    return children;
  }
  return <Navigate to="/403-forbidden" replace />;
};
export default Protected;

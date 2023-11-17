import constants from 'app-constants';
import { Navigate } from 'react-router-dom';

const NavigateAuth = ({ isLoggedIn, userType, children }) => {
  constants.pp(userType);
  if (isLoggedIn) {
    if (userType == 1) {
      return <Navigate to={'/admin'} replace />;
    }
    return <Navigate to={'/basic-details'} replace />;
  }
  return children;
};

export default NavigateAuth;

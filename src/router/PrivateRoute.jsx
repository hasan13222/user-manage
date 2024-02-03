import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from './../pages/Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()

  if (loading) {
    return <>Loading...</>;
  }
  if (user) {
    return <>{children}</>;
  }else {
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
  }
};

export default PrivateRoute;

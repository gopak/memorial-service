import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { logOut } from "../services/auth/Auth.service";
import { useAppDispatch } from "../store/store";
import { alertMessage } from "../components/alert-message/AlertMessage";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (authContext?.loading) {
    return <span className="profileLoading-root"></span>;
  }

  if (!authContext?.authProviderState) {
    return <Navigate to="/" replace />;
  }

  if (
    authContext?.authProviderState?.userType !== undefined &&
    !location?.pathname?.startsWith(
      `/${authContext?.authProviderState?.userType}`,
    )
  ) {
    dispatch(logOut());
    alertMessage({
      type: "info",
      message: "Ваш сеанс закінчився, будь ласка, увійдіть",
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

import { Navigate, Outlet } from "react-router-dom";
import useSessionChecker from "../../hooks/useSessionChecker";

const ProtectedRoute = ({ requireAuth = true }) => {
  const { auth } = useSessionChecker();

  if (requireAuth && !auth.loggedIn) {
    return <Navigate to="/auth" replace />;
  }

  if (!requireAuth && auth.loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

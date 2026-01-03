import { Navigate, useLocation } from "react-router-dom";
import { isAdminLoggedIn } from "../../lib/adminAuth";

type Props = {
  children: React.ReactNode;
};

const AdminProtectedRoute = ({ children }: Props) => {
  const location = useLocation();

  if (!isAdminLoggedIn()) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;

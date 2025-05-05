import { useAuthContext } from "../components/contexts/AuthContext";
import { Navigate } from "@tanstack/react-router";
export default function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useAuthContext();
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else {
    return <>{children}</>;
  }
}

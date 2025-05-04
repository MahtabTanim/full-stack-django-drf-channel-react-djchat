import { useAuthContext } from "../components/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
export default function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useAuthContext();
  const navigattor = useNavigate();
  if (isLoggedIn == false) {
    return <Navigate to="/login" replace={true}></Navigate>;
  } else {
    return <>{children}</>;
  }
}

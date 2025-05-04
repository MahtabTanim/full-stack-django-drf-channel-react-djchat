import useAuthService from "../../services/authSevice";
import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const authService = useAuthService();
  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw Error("You have to use Auth service provide");
  }
  return context;
}

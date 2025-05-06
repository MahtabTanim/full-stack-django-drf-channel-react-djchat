import useMembershipService from "../../services/membershipService";
import { createContext, useContext } from "react";

const MemberContext = createContext(null);

export function MemberContextProvider({ children }) {
  const membershipService = useMembershipService();
  return (
    <MemberContext.Provider value={membershipService}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMembershipContext() {
  const context = useContext(MemberContext);
  if (context === null) {
    throw Error(
      "useMembershipContext must be used within a MemberContextProvider",
    );
  }
  return context;
}

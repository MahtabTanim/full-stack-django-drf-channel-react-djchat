import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoutes from "../services/ProtectedRoutes";
import Server from "../../src/pages/Server";
import { MemberContextProvider } from "../components/contexts/MemberContext";
import MembershipCheck from "../components/JoinServer/MembershipCheck";
export const Route = createFileRoute("/server/$server_id")({
  component: () => {
    return (
      // <ProtectedRoutes>
      //   <MemberContextProvider>
      //     <MembershipCheck>
      <Server />
      //     </MembershipCheck>
      //   </MemberContextProvider>
      // </ProtectedRoutes>
    );
  },
});

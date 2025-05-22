import { createFileRoute } from "@tanstack/react-router";
import Server from "../../src/pages/Server";
import ProtectedRoutes from "../services/ProtectedRoutes";
import { MemberContextProvider } from "../components/contexts/MemberContext";
import MembershipCheck from "../components/JoinServer/MembershipCheck";
export const Route = createFileRoute("/server_/$server_id/$channel_id")({
  component: () => {
    return (
      // <ProtectedRoutes>
      //   <MemberContextProvider>
      //     <MembershipCheck>
      <Server />
      /// </MembershipCheck>
      //</MemberContextProvider>
      //</ProtectedRoutes>
    );
  },
});

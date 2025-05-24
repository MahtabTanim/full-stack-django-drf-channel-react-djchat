import { createFileRoute } from "@tanstack/react-router";
import CreateServer from "../pages/CreateServer";
import ProtectedRoutes from "../services/ProtectedRoutes";
import { MemberContextProvider } from "../components/contexts/MemberContext";
import MembershipCheck from "../components/JoinServer/MembershipCheck";
export const Route = createFileRoute("/createServer")({
  component: () => {
    return (
      <ProtectedRoutes>
        <MemberContextProvider>
          <MembershipCheck>
            <CreateServer />
          </MembershipCheck>
        </MemberContextProvider>
      </ProtectedRoutes>
    );
  },
});

import { createFileRoute } from "@tanstack/react-router";
import Explore from "../../pages/Explore";
import { MemberContextProvider } from "../../components/contexts/MemberContext";
import ProtectedRoutes from "../../services/ProtectedRoutes";
import MembershipCheck from "../../components/JoinServer/MembershipCheck";
export const Route = createFileRoute("/explore/$categoryName")({
  component: () => {
    return (
      <ProtectedRoutes>
        <MemberContextProvider>
          <MembershipCheck>
            <Explore />
          </MembershipCheck>
        </MemberContextProvider>
      </ProtectedRoutes>
    );
  },
});

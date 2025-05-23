import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoutes from "../services/ProtectedRoutes";
import { MemberContextProvider } from "../components/contexts/MemberContext";
import MembershipCheck from "../components/JoinServer/MembershipCheck";
import Homepage from "../pages/Homepage";
export const Route = createFileRoute("/")({
  component: () => (
    // <ProtectedRoutes>
    <Homepage />
    // </ProtectedRoutes>
  ),
});

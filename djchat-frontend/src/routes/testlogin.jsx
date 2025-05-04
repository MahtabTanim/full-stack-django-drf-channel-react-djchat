import { createFileRoute } from "@tanstack/react-router";
import TestLogin from "../pages/TestLogin";
import ProtectedRoutes from "../services/ProtectedRoutes";

export const Route = createFileRoute("/testlogin")({
  component: () => {
    return (
      <ProtectedRoutes>
        <TestLogin />
      </ProtectedRoutes>
    );
  },
});

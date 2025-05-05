import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoutes from "../services/ProtectedRoutes";
import Server from "../../src/pages/Server";

export const Route = createFileRoute("/server/$server_id")({
  component: () => {
    return (
      <ProtectedRoutes>
        <Server />
      </ProtectedRoutes>
    );
  },
});

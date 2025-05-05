import { createFileRoute } from "@tanstack/react-router";
import Server from "../../src/pages/Server";
import ProtectedRoutes from "../services/ProtectedRoutes";
export const Route = createFileRoute("/server_/$server_id/$channel_id")({
  component: () => {
    return (
      <ProtectedRoutes>
        <Server />
      </ProtectedRoutes>
    );
  },
});

import { createFileRoute } from "@tanstack/react-router";
import Server from "../pages/Server";

export const Route = createFileRoute("/server")({
  component: Server,
});

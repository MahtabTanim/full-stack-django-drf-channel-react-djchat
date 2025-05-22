import { createFileRoute } from "@tanstack/react-router";
import CreateServer from "../pages/CreateServer";
export const Route = createFileRoute("/createServer")({
  component: CreateServer,
});

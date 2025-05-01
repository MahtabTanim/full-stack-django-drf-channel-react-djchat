import { createFileRoute } from "@tanstack/react-router";
import Server from "../../src/pages/Server";

export const Route = createFileRoute("/server_/$server_id/$channel_id")({
  component: Server,
});

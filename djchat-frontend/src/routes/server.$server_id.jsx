import { createFileRoute } from "@tanstack/react-router";

import Server from "../../src/pages/Server";

export const Route = createFileRoute("/server/$server_id")({
  component: Server,
});

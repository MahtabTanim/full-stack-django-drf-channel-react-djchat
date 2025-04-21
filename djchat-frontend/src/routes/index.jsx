import { createFileRoute, Link } from "@tanstack/react-router";
import Homepage from "../pages/Homepage";

export const Route = createFileRoute("/")({
  component: Homepage,
});

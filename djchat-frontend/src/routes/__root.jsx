import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import PrimaryAppBar from "../pages/templates/PrimaryAppBar";
import { CssBaseline } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <CssBaseline />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFoundComponent,
});

export function NotFoundComponent() {
  return (
    <>
      <h2 style={{ color: "red" }}>Component Not Found</h2>
    </>
  );
}

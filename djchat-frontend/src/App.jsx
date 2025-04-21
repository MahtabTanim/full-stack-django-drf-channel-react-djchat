import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFoundComponent } from "./routes/__root";
import { ThemeProvider } from "@mui/material";
import MuiTheme from "./theme/theme";

const router = createRouter({
  routeTree: routeTree,
  defaultNotFoundComponent: NotFoundComponent,
});

export default function App() {
  const theme = MuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

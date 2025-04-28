import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFoundComponent } from "./routes/__root";
import ToggleColorMode from "./components/contexts/ToggleColorMode";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MuiTheme from "./theme/theme";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree: routeTree,
  defaultNotFoundComponent: NotFoundComponent,
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToggleColorMode>
        <RouterProvider router={router} />
      </ToggleColorMode>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

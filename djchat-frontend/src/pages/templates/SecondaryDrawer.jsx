import { Box, Typography, List } from "@mui/material";
import { useTheme } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
export default function SecondaryDrawer({ children }) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          minWidth: `${theme.secondaryDrawer.width}px`,
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: { xs: "none", sm: "block" },
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
}

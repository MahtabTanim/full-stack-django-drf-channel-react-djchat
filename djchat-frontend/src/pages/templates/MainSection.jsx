import { Box, Typography, List } from "@mui/material";
import { useTheme } from "@mui/material";
export default function MainSection({ children }) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          //   minWidth: `${theme.secondaryDrawer.width}px`,
          width: "100%",
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          borderRight: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </>
  );
}

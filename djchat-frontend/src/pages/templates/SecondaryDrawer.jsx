import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
export default function SecondaryDrawer() {
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
        {Array.from({ length: 100 }).map((_, index) => (
          <Typography component={"p"} key={index}>
            {index + 1}
          </Typography>
        ))}
      </Box>
    </>
  );
}

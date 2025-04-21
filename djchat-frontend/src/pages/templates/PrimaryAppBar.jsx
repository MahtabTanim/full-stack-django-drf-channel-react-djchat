import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";
export default function PrimaryAppBar() {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Link
          style={{
            color: "inherit",
            textDecoration: "none", // Ensure no underline
          }}
          to="/"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: {
                fontWeight: 700,
                letterSpacing: "-0.5px",
              },
            }}
          >
            DJCHAT
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

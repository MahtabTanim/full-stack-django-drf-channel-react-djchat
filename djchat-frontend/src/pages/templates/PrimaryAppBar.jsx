import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";

export default function PrimaryAppBar() {
  const theme = useTheme();
  const [sideMenuStatus, setSideMenuStatus] = useState(false);
  const bigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (bigScreen && sideMenuStatus) {
      setSideMenuStatus(false);
    }
  }, [bigScreen]);

  function toggleSideMenu() {
    setSideMenuStatus(!sideMenuStatus);
  }
  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "block",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" }, mr: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSideMenu}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor="left"
          open={sideMenuStatus && !bigScreen}
          ModalProps={{ keepMounted: true }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Typography component={"p"} key={index}>
              {index + 1}
            </Typography>
          ))}
        </Drawer>
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

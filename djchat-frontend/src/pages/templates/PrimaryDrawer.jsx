import {
  Box,
  styled,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DrawerToggle from "../../components/PrimaryDrawer/DrawerToggle";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";

export default function PrimaryDrawer({ children }) {
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width: 599px)");
  const [primaryDrawerStatus, setPrimaryDrawerStatus] = useState(!below600);
  useEffect(() => {
    setPrimaryDrawerStatus(!below600);
  }, [below600]);

  const handlePrimaryDrawerOpen = () => {
    setPrimaryDrawerStatus(true);
  };
  const handlePrimaryDrawerClose = () => {
    setPrimaryDrawerStatus(false);
  };

  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: theme.primaryDrawer.closed,
  });

  const Drawer = styled(
    MuiDrawer,
    {},
  )(({ theme, open }) => ({
    width: theme.primaryDrawer.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }));

  return (
    <>
      <Drawer
        open={primaryDrawerStatus}
        variant={below600 ? "temporary" : "permanent"}
        slotProps={{
          paper: {
            sx: {
              mt: `${theme.primaryAppBar.height}px`,
              height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
              width: `${theme.primaryDrawer.width}px`,
            },
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              p: 0,
              width: primaryDrawerStatus ? "auto" : "100%",
              display: "flex",
              justifyContent: "flex-end",
              zIndex: 1301, // higher than MUI Drawer default (1200)
            }}
          >
            <DrawerToggle
              primaryDrawerStatus={primaryDrawerStatus}
              handlePrimaryDrawerOpen={handlePrimaryDrawerOpen}
              handlePrimaryDrawerClose={handlePrimaryDrawerClose}
            />
          </Box>

          {React.Children.map(children, (child) =>
            React.cloneElement(child, { primaryDrawerStatus }),
          )}
        </Box>
      </Drawer>
    </>
  );
}

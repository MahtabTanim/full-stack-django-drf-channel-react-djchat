import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DrawerToggle from "../../components/DrawerToggle";
import MuiDrawer from "@mui/material/Drawer";

export default function PrimaryDrawer() {
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

  const theme = useTheme();

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
    {}
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
        <Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              p: 0,
              width: primaryDrawerStatus ? "auto" : "100%",
            }}
          >
            <DrawerToggle
              primaryDrawerStatus={primaryDrawerStatus}
              handlePrimaryDrawerOpen={handlePrimaryDrawerOpen}
              handlePrimaryDrawerClose={handlePrimaryDrawerClose}
            />
            {Array.from({ length: 100 }).map((_, index) => (
              <Typography component={"p"} key={index}>
                {index + 1}
              </Typography>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

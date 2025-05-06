import { useParams } from "@tanstack/react-router";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  ListItemAvatar,
  Avatar,
  IconButton,
  Drawer,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material";
import ServerChannels from "../SecondaryDrawer/ServerChannels";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import JoinServer from "../JoinServer/JoinServerButton";
export default function MessageInterfaceChannels({ data }) {
  const theme = useTheme();
  const { server_id, channel_id } = useParams({ strict: false });
  const server = data.data;
  const channels = server?.[0]?.channel_server ?? [];
  let channel_name = "Home";
  channels.map((channel) => {
    if (Number(channel.id) === Number(channel_id)) {
      channel_name = channel.name;
    }
  });

  const [sideMenuStatus, setSideMenuStatus] = useState(false);
  const bigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (bigScreen || sideMenuStatus) {
      setSideMenuStatus(false);
    }
  }, [bigScreen]);

  function toggleSideMenu() {
    setSideMenuStatus(!sideMenuStatus);
  }
  const channelList = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
      onClick={() => setSideMenuStatus(false)}
      onKeyDown={() => setSideMenuStatus(false)}
    >
      <ServerChannels data={server?.[0]?.channel_server} />
    </Box>
  );
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: `theme.palette.background.default`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ minWidth: "40px" }}>
            <Avatar
              alt="Channel Icon"
              src={
                server?.[0]?.icon ? server[0].icon : "https://picsum.photos/200"
              }
              sx={{ width: 30, height: 30 }}
            />
          </Box>

          <Typography noWrap component="div">
            {channel_name}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <JoinServer />
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" edge="end" onClick={toggleSideMenu}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={sideMenuStatus}
            onClose={(event) => {
              if (
                event.type === "keydown" &&
                (event.key === "Tab" || event.key === "Shift")
              ) {
                return;
              }
              setSideMenuStatus(false);
            }}
          >
            {channelList()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}

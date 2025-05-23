import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function ServerChannels({ data = [] }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const boxStyle = {
    height: "50px",
    display: "flex",
    alignItems: "center",
    px: 2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: "sticky",
    top: 0,
    backgroundColor: `${theme.palette.background.default}`,
  };
  return (
    <>
      <Box sx={boxStyle}>Channels</Box>
      <List>
        {data?.map((channel) => (
          <ListItem
            key={channel.id}
            sx={{
              display: "block",
            }}
            dense={true}
          >
            <Link
              to={`/server/${channel.server}/${channel.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <Avatar
                      alt="channel-icon"
                      src={channel.icon}
                      sx={{ filter: isDarkMode ? "invert(100%)" : "none" }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      textAlign="start"
                      paddingLeft={1}
                    >
                      {channel.name}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}

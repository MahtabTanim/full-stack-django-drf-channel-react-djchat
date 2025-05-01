import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";

import { Link } from "@tanstack/react-router";

export default function UserServers({ primaryDrawerStatus, data = [] }) {
  const boxStyles = {
    height: 50,
    p: 2,
    display: "flex",
    alignItems: "center",
    flex: "1 1 100%",
  };

  return (
    <>
      <Box sx={{ ...boxStyles, position: "sticky" }}>
        <Typography
          sx={{
            display: primaryDrawerStatus ? "block" : "none",
          }}
          component={"div"}
        >
          Server
        </Typography>
      </Box>
      <List>
        {data.map((server) => (
          <ListItem
            key={server.id}
            disablePadding
            sx={{ display: "block" }}
            dense={true}
          >
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/server/${server.id}`}
            >
              <ListItemButton sx={{ minHeight: 0 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "50px" }}>
                    <Avatar alt="server-icon" src={server.icon} />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {server.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: "textSecondary",
                      }}
                    >
                      {server.category.name}
                    </Typography>
                  }
                  sx={{ primaryDrawerStatus: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    sx: {
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whitespace: "nowrap",
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}

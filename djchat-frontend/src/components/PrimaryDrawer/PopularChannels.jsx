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
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import axios from "axios";

export default function PopularChannels({ primaryDrawerStatus }) {
  const boxStyles = {
    height: 50,
    p: 2,
    display: "flex",
    alignItems: "center",
    flex: "1 1 100%",
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["api/server/all"],
    queryFn: () =>
      axios.get("/api/server/select/").then((res) => {
        return res.data;
      }),
    staleTime: 30000,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading Categories</Typography>;

  return (
    <>
      <Box sx={{ ...boxStyles, position: "sticky" }}>
        <Typography
          sx={{
            backgroundColor: "red",
            display: primaryDrawerStatus ? "block" : "none",
          }}
          component={"div"}
        >
          Popular Channels
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
            <Link style={{ textDecoration: "none", color: "inherit" }}>
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

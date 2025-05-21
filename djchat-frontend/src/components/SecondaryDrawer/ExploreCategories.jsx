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
import axios from "axios";

export default function ExploreCategories() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { isPending, data, error } = useQuery({
    queryKey: ["api/categories"],
    queryFn: () =>
      axios
        .get("https://backend.djchat.space/api/categories/select/")
        .then((res) => {
          return Array.isArray(res.data) ? res.data : [...res.data];
        }),
    staleTime: 30000,
  });
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
  if (isPending) return <Box sx={boxStyle}>Loading...</Box>;
  if (error) return <Box sx={boxStyle}>Error loading categories</Box>;

  return (
    <>
      <Box sx={boxStyle}>Explore</Box>
      <List>
        {data?.map((category) => (
          <ListItem
            key={category.id}
            sx={{
              display: "block",
            }}
            dense={true}
          >
            <Link
              to={`/explore/${category.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <Avatar
                      alt="server-icon"
                      src={category.icon}
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
                      {category.name}
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

import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link } from "@tanstack/react-router";

export default function ExploreServers() {
  const { categoryName } = useParams({ strict: false });
  const category = encodeURIComponent(categoryName);
  const query_string = `/api/server/select/?category=${category}`;
  const { isPending, data, error } = useQuery({
    queryKey: [`api/categories/${category}`],
    queryFn: () =>
      axios.get(query_string).then((res) => {
        return res.data;
      }),
    staleTime: 30000,
  });
  if (isPending) {
    return <>Loading</>;
  }
  if (error) {
    return <>Error Found </>;
  }
  if (!isPending)
    return (
      <>
        <Container maxWidth="lg">
          <Box sx={{ pt: 6 }}>
            <Typography
              variant="h3"
              noWrap
              component="h1"
              sx={{
                display: {
                  sm: "block",
                  fontWeight: 700,
                  letterSpacing: "-2px",
                  textTransform: "capitalize",
                },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {categoryName ? categoryName : "Popular Channels"}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="h2"
              color="textSecondary"
              sx={{
                display: {
                  sm: "block",
                  fontWeight: 700,
                  letterSpacing: "-1px",
                },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {categoryName
                ? `Channels talking about ${categoryName}`
                : "Check out some of our popular channels"}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            sx={{ pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px" }}
          >
            Recommended Channels
          </Typography>
          <Grid container spacing={{ xs: 0, sm: 2 }}>
            {data.map((item) => (
              <Grid
                key={item.id}
                sx={{
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 3,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "none",
                    backgroundImage: "none",
                    borderRadius: 0,
                  }}
                >
                  <Link
                    to={`/server/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        item.banner
                          ? item.banner
                          : "https://picsum.photos/200/300"
                      }
                      alt="channel banner"
                      sx={{
                        display: { xs: "none", sm: "block" },
                        width: "100%",
                        height: 140, // or any fixed height you want
                        objectFit: "cover", // important: this keeps the image neat!
                        borderRadius: 2, // optional: if you want slightly rounded corners
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 0,
                        "&:last-child": { paddingBottom: 0 },
                      }}
                    >
                      <List>
                        <ListItem disablePadding>
                          <ListItemIcon sx={{ minWidth: 0 }}>
                            <ListItemAvatar sx={{ minWidth: "50px" }}>
                              <Avatar alt="server Icon" src={item.icon} />
                            </ListItemAvatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                textAlign="start"
                                sx={{
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  fontWeight: 700,
                                }}
                              >
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2">
                                {item.category.name}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    );
}

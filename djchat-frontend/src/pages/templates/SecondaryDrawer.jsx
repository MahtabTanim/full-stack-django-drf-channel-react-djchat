import { Box, Typography, List } from "@mui/material";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
export default function SecondaryDrawer() {
  const theme = useTheme();
  const { isPending, data, error } = useQuery({
    queryKey: ["api/server"],
    // queryFn: () => fetch("api/server/select/").then((res) => res.json()),
    queryFn: () => axios.get("api/server/select/").then((res) => res.data),
    staleTime: 30000,
  });
  return (
    <>
      <Box
        sx={{
          minWidth: `${theme.secondaryDrawer.width}px`,
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: { xs: "none", sm: "block" },
          overflow: "auto",
        }}
      >
        {error ? (
          <>
            <h1>Error Found</h1>
          </>
        ) : null}
        {!error && !isPending ? <ShowData data={data} /> : <Loading />}
      </Box>
    </>
  );

  function ShowData({ data }) {
    return (
      <>
        {
          <ul>
            {data.map((value, key) => (
              <li key={key}>
                <h5>{value.name}</h5>
              </li>
            ))}
          </ul>
        }
      </>
    );
  }
}

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h6" color="textSecondary">
        Loading...
      </Typography>
    </Box>
  );
}

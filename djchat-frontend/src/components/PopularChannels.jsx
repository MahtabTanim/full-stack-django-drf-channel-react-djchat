import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function PopularChannels({ primaryDrawerStatus }) {
  const boxStyles = {
    height: 50,
    p: 2,
    display: "flex",
    alignItems: "center",
    flex: "1 1 100%",
  };
  const { isPending, data, error } = useQuery({
    queryKey: ["api/server"],
    // queryFn: () => fetch("api/server/select/").then((res) => res.json()),
    queryFn: () => axios.get("api/server/select/").then((res) => res.data),
    staleTime: 30000,
  });

  if (isPending) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading channels</Typography>;

  return (
    <>
      <Box sx={boxStyles}>
        <Typography sx={{ display: primaryDrawerStatus ? "block" : "none" }}>
          {data
            ? data.channels.map((channel) => (
                <div key={channel.id}>{channel.name}</div>
              ))
            : null}
        </Typography>
      </Box>
    </>
  );
}

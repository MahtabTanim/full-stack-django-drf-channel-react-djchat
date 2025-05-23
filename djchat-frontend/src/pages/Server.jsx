import { Box, CssBaseline, CircularProgress } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import ServerChannels from "../components/SecondaryDrawer/ServerChannels";
import MessageInterface from "../components/Main/MessageInterface";
import ExploreCategories from "../components/SecondaryDrawer/ExploreCategories";
import MainSection from "./templates/MainSection";
import UserServers from "../components/PrimaryDrawer/UserServers";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { requestUrl } from "../components/contexts/Urls";

export default function Server() {
  const navigate_initiator = useNavigate();
  const { server_id, channel_id } = useParams({ strict: false });
  const queryUrl = `${requestUrl}/server/select/${server_id}`;
  const { isLoading, error, data } = useQuery({
    queryKey: ["api/server/", server_id],
    queryFn: () =>
      axios.get(queryUrl, { withCredentials: true }).then((res) => {
        const dataArray = [res.data];
        return dataArray;
      }),
    staleTime: 20000,
  });

  function isChannel() {
    if (isLoading || !channel_id) {
      return true;
    }
    const channels = data[0].channel_server;
    return channels.some((channel) => channel.id === parseInt(channel_id));
  }
  if (error) {
    console.log(error.message);
    navigate_initiator({ to: "/" });
  }
  if (!isChannel()) {
    navigate_initiator({ to: `/server/${server_id}` });
  }
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer>
          {isLoading ? <LoadingComponent /> : <UserServers data={data} />}
        </PrimaryDrawer>
        <SecondaryDrawer>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <ServerChannels data={data[0].channel_server} />
          )}
        </SecondaryDrawer>
        <MainSection>
          {isLoading ? <LoadingComponent /> : <MessageInterface data={data} />}
        </MainSection>
      </Box>
    </>
  );
}

export function LoadingComponent() {
  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
}

import { useNavigate, useParams } from "@tanstack/react-router";
import { useMembershipContext } from "../contexts/MemberContext";
import { Button, CircularProgress, Box } from "@mui/material";

export default function JoinServer() {
  const { joinServer, leaveServer, error, isLoading, isMember, isUserMember } =
    useMembershipContext();
  const { server_id } = useParams({ strict: false });
  const navigattor = useNavigate();

  const handleJoinServer = async () => {
    try {
      await joinServer(server_id);
      navigattor({ to: `/server/${server_id}` });
    } catch (err) {
      console.log("Error Joining", err);
    }
  };

  const handleLeaveServer = async () => {
    try {
      await leaveServer(server_id);
      navigattor({ to: `/server/${server_id}` });
    } catch (err) {
      console.log("Error leaving the server", err);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box textAlign="center">
      {isUserMember ? (
        <Button variant="outlined" color="error" onClick={handleLeaveServer}>
          Leave Server
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleJoinServer}>
          Join Server
        </Button>
      )}
    </Box>
  );
}

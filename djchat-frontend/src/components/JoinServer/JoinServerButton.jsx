import { useNavigate, useParams } from "@tanstack/react-router";
import { useMembershipContext } from "../contexts/MemberContext";

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
    return <div>Loading</div>;
  }
  return (
    <>
      <p>isMember : {isUserMember.toString()}</p>
      {isUserMember ? (
        <button onClick={handleLeaveServer}>Leave server</button>
      ) : (
        <button onClick={handleJoinServer}>Join Server</button>
      )}
    </>
  );
}

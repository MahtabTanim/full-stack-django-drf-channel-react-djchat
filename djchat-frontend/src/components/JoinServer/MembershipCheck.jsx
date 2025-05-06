import { useEffect } from "react";
import { useMembershipContext } from "../contexts/MemberContext";
import { useParams } from "@tanstack/react-router";

const MembershipCheck = ({ children }) => {
  const { server_id } = useParams({ strict: false });
  const { isMember } = useMembershipContext();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        await isMember(Number(server_id));
      } catch (error) {
        console.log("Error checking membership status", error);
      }
    };
    checkMembership();
  }, [server_id]);

  return <>{children}</>;
};

export default MembershipCheck;

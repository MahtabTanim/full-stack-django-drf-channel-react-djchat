import { useState } from "react";
import useJwtInterceptor from "../components/helpers/jwtinterceptor";

export default function useMembershipService() {
  const jwtAxios = useJwtInterceptor();

  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isUserMember, setIsUserMember] = useState(false);
  const joinServer = async (server_id) => {
    setIsloading(true);
    setError(null);
    try {
      const result = await jwtAxios.post(
        `/api/membership/${server_id}/membership/`,
        {},
        { withCredentials: true },
      );
      setIsloading(false);
      setIsUserMember(true);
    } catch (err) {
      setError(err);
      setIsloading(false);
      throw err;
    }
  };
  const leaveServer = async (server_id) => {
    setIsloading(true);
    setError(null);
    try {
      const result = await jwtAxios.delete(
        `/api/membership/${server_id}/membership/remove_member/`,
        {},
        { withCredentials: true },
      );
      setIsloading(false);
      setIsUserMember(false);
    } catch (err) {
      setError(err);
      setIsloading(false);
      throw err;
    }
  };
  const isMember = async (server_id) => {
    setIsloading(true);
    setError(null);
    try {
      const result = await jwtAxios.get(
        `/api/membership/${server_id}/membership/is_member/`,
        {},
        { withCredentials: true },
      );
      setIsloading(false);
      const data = result.data;
      setIsUserMember(Boolean(data.is_member));
    } catch (err) {
      setError(err);
      setIsloading(false);
      throw err;
    }
  };

  return { joinServer, leaveServer, error, isLoading, isMember, isUserMember };
}

import { useAuthContext } from "../components/contexts/AuthContext";
import { useState } from "react";
import useJwtInterceptor from "../components/helpers/jwtinterceptor";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
export default function TestLogin() {
  const navigattor = useNavigate();
  const jwtAxios = useJwtInterceptor();
  const { isLoggedIn, logout } = useAuthContext();
  const [userName, setUsername] = useState("");

  const getUserDetails = async () => {
    const url = `api/user/1/`;
    await jwtAxios
      .get(url, { withCredentials: true })
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>isLogged is : {isLoggedIn.toString()}</div>
      <div>Username is : {userName}</div>

      <button
        type="submit"
        onClick={() => {
          logout(navigattor);
        }}
      >
        Logout
      </button>
      <button onClick={getUserDetails}>Get User details</button>
    </>
  );
}

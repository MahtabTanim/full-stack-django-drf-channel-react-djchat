import axios from "axios";
import { useState } from "react";

export default function useAuthService() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== null && loggedIn == "true") {
      return true;
    }
    return false;
  });

  // const getUserFromToken = (access = "") => {
  //   const tokenParts = access.split(".");
  //   const getEndcodedDetails = tokenParts[1];
  //   const getDecodedDetails = atob(getEndcodedDetails);
  //   return JSON.parse(getDecodedDetails).user_id;
  // };
  // const getUserDetails = async (id, access) => {
  //   const url = `api/user/${id}`;
  //   const result = await axios
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${access}`,
  //       },
  //     })
  //     .then((response) => {
  //       setIsLoggedIn(true);
  //       localStorage.setItem("username", response.data.username);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoggedIn(false);
  //       localStorage.setItem("isLoggedIn", false);
  //       console.log("Error occured , username not found");
  //     });
  // };
  const login = async (username, password) => {
    const result = await axios
      .post(
        "api/token/",
        {
          username,
          password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        return { success: true, data: response.data };
      })
      .catch((err) => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);
        return { success: false, messsage: err.messsage || "error" };
      });

    return result;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
  };
  return { login, logout, isLoggedIn };
}

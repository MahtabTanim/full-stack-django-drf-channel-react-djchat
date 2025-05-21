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
  const getUserDetails = async (id) => {
    const url = `https://backend.djchat.space/api/user/${id}/`;
    const result = await axios
      .get(
        url,
        {},
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        localStorage.setItem("user_id", id);
        localStorage.setItem("username", response.data.username);
        return true;
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);
        console.log("Error occured , username not found");
        return false;
      });
    return result;
  };

  const register = async (username, password, first_name, last_name) => {
    const result = await axios
      .post(
        "https://backend.djchat.space/api/user/",
        {
          username,
          password,
          first_name,
          last_name,
        },
        { withCredentials: true },
      )
      .then((response) => {
        return { success: true, data: response.data };
      })
      .catch((err) => {
        return { success: false, messsage: err || "error" };
      });

    return result;
  };

  const login = async (username, password) => {
    const result = await axios
      .post(
        "https://backend.djchat.space/api/token/",
        {
          username,
          password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        setIsLoggedIn(true);
        const { user_id } = response.data;
        if (getUserDetails(user_id))
          return { success: true, data: response.data };
        return { success: false, messsage: err.messsage || "error" };
      })
      .catch((err) => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);
        return { success: false, messsage: err.messsage || "error" };
      });

    return result;
  };
  const refreshAccessToken = async () => {
    try {
      await axios.post(
        "https://backend.djchat.space/api/token/refresh",
        {},
        { withCredentials: true },
      );
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  };
  const logout = async (navigate) => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    axios.post(
      "https://backend.djchat.space/api/logout",
      {},
      { withCredentials: true },
    );
    if (navigate) {
      navigate({ to: "/login" });
    }
  };
  return { register, login, logout, isLoggedIn, refreshAccessToken };
}

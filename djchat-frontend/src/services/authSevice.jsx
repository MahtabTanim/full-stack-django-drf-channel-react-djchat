import axios from "axios";
export default function useAuthService() {
  const getUserFromToken = (access = "") => {
    const tokenParts = access.split(".");
    const getEndcodedDetails = tokenParts[1];
    const getDecodedDetails = atob(getEndcodedDetails);
    return JSON.parse(getDecodedDetails).user_id;
  };
  const getUserDetails = async (id, access) => {
    const url = `api/user/${id}`;
    const result = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${access}ss`,
        },
      })
      .then((response) => {
        localStorage.setItem("username", response.data.username);
      })
      .catch((err) => {
        console.log("Error occured , username not found");
      });
  };
  const login = async (username, password) => {
    const result = await axios
      .post("api/token/", {
        username,
        password,
      })
      .then((response) => {
        const { access, refresh } = response.data;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        const user_id = getUserFromToken(access);
        localStorage.setItem("user_id", user_id);
        getUserDetails(user_id, access);
        return { success: true, data: response.data };
      })
      .catch((err) => {
        return { success: false, messsage: err.messsage || "error" };
      });

    return result;
  };
  return { login };
}

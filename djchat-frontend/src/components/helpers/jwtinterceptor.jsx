import axios from "axios";
import { useNavigate } from "@tanstack/react-router";

export default function useJwtInterceptor() {
  const jwtAxios = axios.create({});
  const navigattor = useNavigate();
  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const original_request = error.config;
      if (error.response.status == 401 || error.response.status == 403) {
        axios.defaults.withCredentials = true;
        try {
          const response = await axios.post(
            "/api/token/refresh",
            {
              refresh: refreshToken,
            },
            { withCredentials: true },
          );
          const newAccessToken = response.data.access;
          original_request.headers["Authorization"] =
            `Bearer ${newAccessToken}`;
          localStorage.setItem("access", newAccessToken);
          return jwtAxios(original_request);
        } catch (refresherror) {
          navigattor({ to: "/login" });
          throw refresherror;
        }
      } else {
        navigattor({ to: "/login" });
        return;
      }
    },
  );
  return jwtAxios;
}

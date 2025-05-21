import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import useAuthService from "../../services/authSevice";

export default function useJwtInterceptor() {
  const navigattor = useNavigate();
  const { logout } = useAuthService();
  const jwtAxios = axios.create({
    withCredentials: true,
  });

  const navigate = useNavigate();

  jwtAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const isRefreshRequest =
        originalRequest.url?.includes("/api/token/refresh");
      const isUnauthorized =
        error.response?.status === 401 || error.response?.status === 403;
      if (isUnauthorized && !originalRequest._retry && !isRefreshRequest) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            "https://backend.djchat.space/api/token/refresh",
            { withCredentials: true }, // Ensure cookies are sent
          );
          if (refreshResponse.status === 200) {
            return jwtAxios(originalRequest, { withCredentials: true });
          }
        } catch (refreshError) {
          logout(navigattor);
          return Promise.reject(refreshError);
        }
      }

      if (isRefreshRequest || originalRequest._retry) {
        navigate({ to: "/login" });
      }

      return Promise.reject(error);
    },
  );

  return jwtAxios;
}

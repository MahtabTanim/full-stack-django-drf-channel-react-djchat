import axios from "axios";
import { useState } from "react";
import { requestUrl } from "../components/contexts/Urls";

export default function useServerCategoryService() {
  const createServer = async (FormData) => {
    try {
      FormData.append("owner", localStorage.getItem("user_id"));
      const response = await axios.post(
        `${requestUrl}/server/select/`,
        FormData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error creating server:", error);
      return { success: false, message: error.message || "An error occurred" };
    }
  };

  const createChannel = async (username, password) => {};

  return { createServer, createChannel };
}

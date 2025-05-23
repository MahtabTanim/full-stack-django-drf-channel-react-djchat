import useAuthService from "./authSevice";
import useWebSocket from "react-use-websocket";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { requestUrl, chatmessageUrl } from "../components/contexts/Urls";
export default function useChatWebSocket(channel_id, server_id) {
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
  const navigattor = useNavigate();
  const maxAttempts = 4;
  const { logout, refreshAccessToken } = useAuthService();
  // wss://backend.djchat.space/1/2
  const socketUrl = channel_id
    ? `wss://127.0.0.1:8000/${server_id}/${channel_id}`
    : null;
  console.log(socketUrl);
  const messageUrl = `${requestUrl}/messages/?channel_id=${channel_id}`;
  const [newMessage, setNewMessage] = useState([]);
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      // console.log("connected");
      try {
        const response = await axios.get(messageUrl, { withCredentials: true });
        const textVal = response.data;
        setNewMessage(textVal);
      } catch (error) {
        console.error(error);
        setNewMessage([]);
      }
    },
    onClose: (event) => {
      if (event.code === 4001) {
        console.log("authentication error");
        refreshAccessToken().catch((error) => {
          if (error.response && error.response.status === 401) {
            logout(navigattor);
          }
        });
      }
      setReconnectionAttempts((prev) => prev + 1);
      console.log("close");
    },

    shouldReconnect: (CloseEvent) => {
      if (CloseEvent.code == 4001 && reconnectionAttempts <= maxAttempts) {
        console.log("reconnecting");
        return true;
      }
      setReconnectionAttempts(0);
      return false;
    },
    onError: () => console.log("Error occured"),
    onMessage: (msg) => {
      const textVal = msg.data;
      const parsed = JSON.parse(textVal).new_message;
      setNewMessage([...newMessage, parsed]);
    },
    reconnectInterval: 1000,
  });
  return {
    sendJsonMessage,
    newMessage,
  };
}

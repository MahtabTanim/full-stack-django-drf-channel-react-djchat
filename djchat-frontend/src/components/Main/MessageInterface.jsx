import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useParams } from "@tanstack/react-router";
import axios from "axios";

export default function MessageInterface() {
  const { server_id, channel_id } = useParams({ strict: false });
  const socketUrl = channel_id
    ? `ws://127.0.0.1:8000/${server_id}/${channel_id}`
    : null;
  const messageUrl = `/api/messages/?channel_id=${channel_id}`;
  const [inputValue, setInputValue] = useState("");
  const [newMessage, setNewMessage] = useState([]);

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      console.log("connected");
      try {
        const response = await axios.get(messageUrl);
        const textVal = response.data;
        setNewMessage(textVal);
      } catch (error) {
        console.error(error);
        setNewMessage([]);
      }
    },
    onClose: () => console.log("disconnected"),
    onError: () => console.log("Error occured"),
    onMessage: (msg) => {
      const textVal = msg.data;
      const parsed = JSON.parse(textVal).new_message;
      setNewMessage([...newMessage, parsed]);
    },
  });
  function handleInput(e) {
    setInputValue(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!(inputValue === "" || !inputValue)) {
      sendJsonMessage({
        type: "message",
        message: inputValue,
      });
      setInputValue("");
    }
  }
  return (
    <>
      <h2>Hello from ChatRoom</h2>
      <div>
        {newMessage.map((msg, index) => {
          return (
            <div key={index}>
              <p>{msg.sender}</p>
              <p>{msg.content}</p>
            </div>
          );
        })}
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">Enter Your Text </label>
          <input
            name="message"
            value={inputValue}
            type="text"
            onChange={handleInput}
          ></input>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

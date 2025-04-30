import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default function Server() {
  const socketUrl = "ws://127.0.0.1:8000/ws/test";
  const [inputValue, setInputValue] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("connected"),
    onClose: () => console.log("disconnected"),
    onError: () => console.log("Error occured"),
    onMessage: (msg) => {
      const textVal = msg.data;
      const parsed = JSON.parse(textVal);
      const newM = parsed.new_message;
      setNewMessage([...newMessage, newM]);
    },
  });
  function handleInput(e) {
    setInputValue(e.target.value);
  }
  function handleSubmit() {
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
              <p>{msg}</p>
            </div>
          );
        })}
        <input value={inputValue} type="text" onChange={handleInput}></input>
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </div>
    </>
  );
}

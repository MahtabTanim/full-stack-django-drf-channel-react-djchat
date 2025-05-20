import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { useParams } from "@tanstack/react-router";

import MessageInterfaceChannels from "./MessageInterfaceChannels";
import { useTheme } from "@mui/material";
import Scroll from "./Scroller";

import useChatWebSocket from "../../services/chatService";

export default function MessageInterface(data) {
  const theme = useTheme();
  const server_name = data.data?.[0]?.name ?? "Server";
  const server_description = data.data?.[0]?.description ?? "Welcome to Server";
  const { server_id, channel_id } = useParams({ strict: false });

  const { sendJsonMessage, newMessage } = useChatWebSocket(
    channel_id,
    server_id,
  );
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
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
  function formatTimeStamp(timestamp) {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  }
  return (
    <>
      <MessageInterfaceChannels data={data} />
      {channel_id === undefined ? (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing="-0.5px"
              maxWidth="600px"
            >
              Welcome to {server_name}
            </Typography>
            <Typography sx={{ mt: 1 }}>{server_description}</Typography>
          </Box>
        </Box>
      ) : (
        <div>
          <Box
            sx={{
              overflow: "hidden",
              p: 0,
              height: `calc(100vh - 190px)`,
            }}
          >
            <Scroll>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {newMessage.map((msg, index) => {
                  return (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="user image" />
                      </ListItemAvatar>
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: "12px",
                          variant: "body2",
                        }}
                        primary={
                          <>
                            <Typography
                              component="span"
                              variant="body1"
                              color="text.primary"
                              sx={{ display: "inline", fontW: 600 }}
                            >
                              {msg.sender}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="textSecondary"
                            >
                              {" at "}
                              {formatTimeStamp(msg.timestamp)}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body1"
                              style={{
                                overflow: "visible",
                                whiteSpace: "normal",
                                textOverflow: "clip",
                              }}
                              sx={{
                                display: "inline",
                                lineHeight: 1.2,
                                fontWeight: 400,
                                letterSpacing: "-0.2px",
                              }}
                              component="span"
                              color="text.primary"
                            >
                              {msg.content}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Scroll>
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}></Box>
          <form
            onSubmit={handleSubmit}
            style={{
              bottom: 0,
              right: 0,
              padding: "1rem",
              backgroundColor: theme.palette.background.default,
              zIndex: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                multiline
                value={inputValue}
                minRows={1}
                maxRows={4}
                onKeyDown={handleKeyDown}
                onChange={handleInput}
                sx={{ flexGrow: 1 }}
              />
            </Box>
          </form>
        </div>
      )}
    </>
  );
}

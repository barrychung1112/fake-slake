import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import { send } from "../features/appSlice";
import "firebase/compat/firestore";

function ChatInput({ channelName, channelId }) {
  const dispatch = useDispatch()
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth)
  function sendMessage(e) {
    e.preventDefault();
    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImg: user.photoURL,
    });

    setInput("");
    dispatch(send())
  }
  return (
    <ChatInputContainer>
    <form>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Message #${channelName}`}
      />
      <Button hidden type="submit" onClick={sendMessage}>
        SEND
      </Button>
    </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 5px;
    outline: none;
    height: 30px;
  }

  > form > button {
    display: none !important;
  }
`;

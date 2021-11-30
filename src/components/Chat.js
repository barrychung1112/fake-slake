import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { selectRoomId, selectSend } from "../features/appSlice";
import { db } from "../firebase";
import Message from "./Message";

function Chat() {
  const roomId = useSelector(selectRoomId);
  const send = useSelector(selectSend);
  const chatRef = useRef(null);
  const [roomDetails, setRoomDetails] = useState({ name: "" });
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {// change chennel
    const fetchRoomDetails = async () => {
      if (roomId) {
        db.collection("rooms")
          .doc(roomId)
          .onSnapshot(async () => {
            const response = db.collection("rooms").doc(roomId);
            const data = await response.get();
            setRoomDetails(data.data());
          });
      }
    };
    const fetchRoomMessages = async () => {
      if (roomId) {
        db.collection("rooms")
          .doc(roomId)
          .collection("messages")
          .onSnapshot(async () => {
            const response = db
              .collection("rooms")
              .doc(roomId)
              .collection("messages")
              .orderBy("timestamp", "asc");
            const data = await response.get();
            setRoomMessages(data);
          });
      }
    };
    fetchRoomDetails();
    fetchRoomMessages();
    chatRef?.current?.scrollIntoView();
  }, [roomId,send]);
  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>{roomDetails.name}</strong>
          </h4>
          <StarBorderIcon />
        </HeaderLeft>

        <HeaderRight>
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </HeaderRight>
      </Header>
      <ChatMessages>
        {roomMessages?.docs &&
          roomMessages?.docs.map((doc) => {
            const { message, timestamp, user, userImg } = doc.data();
            return (
              <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImg={userImg}
              />
            );
          })}
        <ChatBottom ref={chatRef} />
      </ChatMessages>
      <ChatInput channelId={roomId} channelName={roomDetails.name} />
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const ChatMessages = styled.div``;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
`;

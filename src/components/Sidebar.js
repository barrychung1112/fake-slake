import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ArchiveIcon from "@mui/icons-material/Archive";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";
import SidebarOption from "./SidebarOption";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [user] = useAuthState(auth)
  const fetchChannels = async () => {
    const response = db.collection("rooms");
    const data = await response.get();
    setChannels(data.docs)
  };
  useEffect(() => {
    fetchChannels();
  },[]);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>MIH Group</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={ArchiveIcon} title="Mentions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkAddedIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="Files" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Show more" />
      <hr />
      <SidebarOption Icon={AddIcon} addChnnelOption title="Add Channel" />
      {channels?.map((doc,index) => {
          return (
          <SidebarOption
            key={index}
            id={doc.id}
            title={doc.data().name}
          />
          )
      })}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 13px;
    background-color: white;
    border-radius: 999px;
    margin-top: 10px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;

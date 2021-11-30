import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enterRoom } from "../features/appSlice";
import { db } from "../firebase";

function SidebarOption({ Icon, title, addChnnelOption, id }) {
  const dispatch = useDispatch()
  
  function addChnnel() {
    const ChnnelName = prompt("Please enter Chnnel name");
    if (ChnnelName) {
      db.collection("rooms").add({
        name: ChnnelName,
      });
    }
  }
  function selectChnnel() {
    if(id){
        dispatch(enterRoom(
            {
                roomId: id
            }
        ))
    }
  }
  return (
    <SidebarOptionContainer
      onClick={addChnnelOption ? addChnnel : selectChnnel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 1px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
`;

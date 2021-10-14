import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />

      <div className="sidebarChat__info">
        {/* to give the list of usernames in chat... */}
        <h1>room</h1>
        <p>number</p>
      </div>
    </div>
  );
}

export default SidebarChat;

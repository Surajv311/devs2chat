import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import firebase from "firebase";
import db from "./firebase";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  {
    /* using Hooks.. */
  }

  useEffect(() => {
    //   this would generate random pics from dicebear... to display on chat dp
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter the name of Chat room");
    if (roomName) {
      // if name of room entered then only execute this ... db stuff...
    }
  };
  return !addNewChat ? (
    // above condition on return means : if we do not add a new chat then execute below code else it would go on to create a new chat/room...

    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />

      <div className="sidebarChat__info">
        {/* to give the list of usernames in chat... */}
        {/* <h1>room</h1> */}
        <h2>{name}</h2>
        <p>number...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2> Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;

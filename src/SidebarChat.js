import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  {
    /* using Hooks.. */
  }

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    //   this would generate random pics from dicebear... to display on chat dp
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Name of Dev_Chat room ?");
    if (roomName) {
      // if name of room entered then execute this ... db stuff...in firebase new data of room is added
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      {/*       
   above condition on return means : if we do not add a new chat then
    execute below code else it would go on to create a new chat/room...
     */}
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
        <div className="sidebarChat__info">
          {/* to give the list of usernames in chat... */}
          {/* <h1>room</h1> */}
          <h2>{name}</h2>
          {/* to show the message */}
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2> Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;

// react router will help to fetch related data chats of the given room when we visit it

// Stackoverflow...
// The old way to concatenate a string :
// var user = 'abc' + myuser;

// ES6:
// var user = `abc${myuser}`;
//

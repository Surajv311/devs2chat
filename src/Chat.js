import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import MoodIcon from "@material-ui/icons/Mood";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import { Link, useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  // {messages}

  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // adding room ...
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      // to pull the messages we put on firestore...
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  {
    /* using Hooks.. */
  }

  useEffect(() => {
    //   this would generate random pics from dicebear... to diplay on chat dp
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    // to prevent the refresh of page when you press enter
    e.preventDefault();

    console.log("typed->", input);

    db.collection("rooms").doc("roomId").collection("messages").add({
      messages: input,
      name: user.displayName, // displayName from google authentication ...
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // serevrtimestamp would help to resolve conflict in time across various time zones of world...
    });

    // cleans input everytime you hit enter

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />

        <div className="chat__headerInfo">
          {/* to display the header */}
          <h3> {roomName}</h3>
          <p>
            {" "}
            last seen {/* last seen message time ... */}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          {/* to put icons in the chat section part */}
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>

          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>

          <IconButton>
            <ExpandMoreSharpIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              // if two people have same name then it may conflict so we have to define an id everytime for better o/p... here just testing..
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">
              {message.name}
              {/* Suraj  */}
            </span>
            {/* HI guys */}
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        {/* for inserting emoji icon */}
        <MoodIcon />

        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message ?"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>

        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;

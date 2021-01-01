import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import MoodIcon from "@material-ui/icons/Mood";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  // {messages}
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [message, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  // adding room ...
  // to pull the messages we put on firestore...

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
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

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      // displayName from google authentication ...
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // serevrtimestamp would help to resolve conflict in time across various time zones of world...
    });
    setInput(""); // cleans input everytime you hit enter
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />

        <div className="chat__headerInfo">
          {/* to display the header */}
          <h3> {roomName}</h3>
          {/* last seen message time ... */}
          <p>
            last seen:{" "}
            {new Date(
              message[message.length - 1]?.timestamp?.toDate()
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
        {message.map((message) => (
          <p
            // if two people have same name then it may conflict so we have to define an id everytime for better o/p... here just testing..
            className={`chat__message ${
              message.name === user.displayName && `chat__receiver`
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

import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import MoodIcon from "@material-ui/icons/Mood";
// import SelectInput from '@material-ui/core/Select/SelectInput';
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import axios from "./axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    // to prevent the refresh of page when you press enter
    e.preventDefault();

    await axios.post("/messages/new", {
      name: "testVERMA",
      message: input,
      timestamp: "now only...test", // ADD TIMESTAMP... UPDATE...
      received: false,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          {/* to display the header */}
          <h3> room name</h3>
          <p> last seen...</p>
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
        {/* in forEach loop you can't return , in map you can return jsx */}

        {messages.map((message, i) => {
          return (
            <p
              key={i}
              className={`chat__message ${
                message.received && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {/* this would show the time of the message */}
                {/* {new Date().toUTCString()} */}
                {/* Now by integrating backend */}

                {message.timestamp}
              </span>
            </p>
          );
        })}

        {/* to receive */}
        <p className=" chat__message chat__receiver">
          <span className="chat__name"> Srj</span>
          message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
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

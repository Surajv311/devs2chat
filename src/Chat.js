import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import MoodIcon from "@material-ui/icons/Mood";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";

function Chat() {
  // {messages}

  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");

  {
    /* using Hooks.. */
  }

  useEffect(() => {
    //   this would generate random pics from dicebear... to diplay on chat dp
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    // to prevent the refresh of page when you press enter
    e.preventDefault();

    console.log("typed->", input);

    // cleans input everytime you hit enter

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />

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
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">
            {/* {message.name} */}
            hollliiii
          </span>
          hifhfie
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

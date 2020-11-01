import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import AllInclusiveRoundedIcon from "@material-ui/icons/AllInclusiveRounded";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import firebase from "firebase";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  // rooms collection created in firestore
  //   snapshot ... //     takes a snapshot of db everytime...

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    // the unique id & data in collections in firestore...

    return () => {
      unsubscribe();
      //     would mean that you detach the real time listener after its done using the above useEffect...
    };
  }, []);

  return (
    <div className="sidebar">
      {/* we have sections in our sidebar... */}
      <div className="sidebar__header">
        <Avatar />

        <div className="sidebar__headerRight">
          {/* adding icons from material UI  */}

          <IconButton>
            {/* after wrapping into IconButton.. you get clickable functionality  */}
            <AllInclusiveRoundedIcon />
          </IconButton>

          {/* similarly importing others */}

          <IconButton>
            <ChatRoundedIcon />
          </IconButton>

          <IconButton>
            <ExpandMoreSharpIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="search" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        {/* components... */}
        {/* now mapping through */}
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

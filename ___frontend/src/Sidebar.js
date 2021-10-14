import React from "react";
import "./Sidebar.css";
import AllInclusiveRoundedIcon from "@material-ui/icons/AllInclusiveRounded";
import { Avatar, IconButton } from "@material-ui/core";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* after having a look of different components in UI  */}
      {/* we develop every component */}

      <div className="sidebar__header">
        {/* adding my avatar  */}

        <Avatar src="https://avatars1.githubusercontent.com/u/59371846?s=400&u=d1b7db461d488b75423d7e1480b743f12e24840e&v=4" />

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
          {/* added search bar from material UI */}
          <SearchOutlinedIcon />
          <input placeholder="search" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        {/* components... */}
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;

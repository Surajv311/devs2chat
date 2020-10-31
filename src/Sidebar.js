import React from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from '@material-ui/core';
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusiveRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';



function Sidebar() {
    return (
        <div className = "sidebar">
        
        {/* we have sections in our sidebar... */}
        <div className = "sidebar__header">
<Avatar/>

<div className= "sidebar__headerRight">

{/* adding icons from material UI  */}

<IconButton>

{/* after wrapping into IconButton.. you get clickable functionality  */}
<AllInclusiveRoundedIcon/>

</IconButton>

{/* similarly importing others */}

<IconButton>
<ChatRoundedIcon/>
</IconButton>


<IconButton>
<ExpandMoreSharpIcon/>
</IconButton>


        </div>
        </div> 

        <div className= "sidebar__search">
        <div className = "sidebar__searchContainer">

        <SearchOutlinedIcon/>
<input placeholder = "search" type = "text"/>

        </div>
</div>

        <div className = "sidebar__chats">

{/* components... */}
<SidebarChat/>
{/* <SidebarChat/>
<SidebarChat/> */}

        </div>


        </div>
    )
}

export default Sidebar

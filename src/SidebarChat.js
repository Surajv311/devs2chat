import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import './SidebarChat.css'


function SidebarChat() {

const [seed, setSeed] = useState(''); 
                
{/* using Hooks.. */}

useEffect(() => {
//   this would generate random pics from dicebear... to diplay on chat dp 
  setSeed(Math.floor(Math.random()*5000))
}, []);


    return (
        <div className = "sidebarChat">

          
            <Avatar src = {`https://avatars.dicebear.com/api/bottts/${seed}.svg`}  />

<div className = "sidebarChat__info">

{/* to give the list of usernames in chat... */}
<h1>room</h1>
<p>number</p>
</div>

        </div>
    )
}

export default SidebarChat

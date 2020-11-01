import './App.css';
import React from "react"; 
import Sidebar from './Sidebar';
import Chat from './Chat'; 



function App() {
  return (

    //  we use BEM naming convention 
    <div className="app">

<div className = "app__body">

{/* Sidebar component */}

<Sidebar/>




{/* Chat component */}

<Chat/>

</div>


    </div>
  );
}

export default App;

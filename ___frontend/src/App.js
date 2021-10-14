import "./App.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  // to fetch and push messages
  useEffect(() => {
    // for fetching all of the initial information

    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  // useEffect runs the piece of code when app loads
  useEffect(() => {
    const pusher = new Pusher("b83118f05612a22c236a...(ADD PUSHER KEY)...", {
      cluster: "ap2",
    });

    // from pusher.trigger we use messages & inserted ...
    const channel = pusher.subscribe("message");
    channel.bind("inserted", (newMessage) => {
      //  alert(JSON.stringify(newMessage));
      // keep the messages and insert the new one as well
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        {/* sidebar component */}
        <Sidebar />

        {/* chat interface component */}
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

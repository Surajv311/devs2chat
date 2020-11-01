import "./App.css";
import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    //  we use BEM naming convention
    <div className="app">
      <div className="app__body">
        <Router>
          <Switch>
            <Route path="/app">
              {/* Sidebar component */}

              <Sidebar />

              {/* Chat component */}

              <Chat />
            </Route>
            <Route path="/">
              {/* when you reach "/" then render the Home... */}
              <h1> Home</h1>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

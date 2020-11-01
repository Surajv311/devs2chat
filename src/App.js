import "./App.css";
import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const { width } = UseWindowDimensions();
  const uid =
    localStorage.getItem("uid") !== undefined
      ? localStorage.getItem("uid")
      : null;
  //console.log(useStateValue);
  //const {user,setUser} = useState(null);
  //console.log(user)

  return (
    //  we use BEM naming convention
    <div className="app">
      {!user && !uid ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            {/* using route parameters in React */}

            {/* Sidebar component */}

            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                {/* Chat component */}
                <Chat />
              </Route>
              <Route path="/">
                {/* when you reach "/" then render the Home...
              <h1> Home</h1> */}
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

import React from "react";

import "./App.scss";

import ServerBrowser from "./Components/ServerBrowser/ServerBrowser";
import ServerBrowserToolTips from "./Components/ServerBrowser/ServerBrowser.ToolTips";
import Chatbar from "./Components/Chatbar/Chatbar";
import Chat from "./Components/Chat/Chat";
import Userbar from "./Components/Userbar/Userbar";

function App() {
  return <div className="App">
    <ServerBrowser />
    <ServerBrowserToolTips />
    
    <div id="ServerInformation">
      <Chatbar />
      <Chat />
      <Userbar />
    </div>
  </div>;
}

export default App;

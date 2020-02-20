import React from "react";

import "./App.scss";
import ServerBrowser from "./Components/ServerBrowser/ServerBrowser";
import ServerBrowserToolTips from "./Components/ServerBrowser/ServerBrowser.ToolTips";

function App() {
  return <div className="App">

    <ServerBrowser />
    <ServerBrowserToolTips />

  </div>;
}

export default App;

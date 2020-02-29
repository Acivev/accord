import React from "react";
import SplitPane from 'react-split-pane';

import "./App.scss";

import ServerBrowser from "./Components/ServerBrowser/ServerBrowser";
import ServerBrowserToolTips from "./Components/ServerBrowser/ServerBrowser.ToolTips";
import Chatbar from "./Components/Chatbar/Chatbar";
import Chat from "./Components/Chat/Chat";
import Userbar from "./Components/Userbar/Userbar";
import VoiceButtonsTooltips from "./Components/Chatbar/Components/VoiceButtons/VoiceButtons.Tooltips";
import ChannelTooltips from "./Components/Chatbar/Components/Category/Components/Channel/Channel.Tooltips";
import AvatarTooltips from "./Components/Shared/Avatar/Avatar.Tooltips";

function App() {
  return <div className="App">
    <ServerBrowser />

    <ServerBrowserToolTips />
    <VoiceButtonsTooltips />
    <ChannelTooltips />
    <AvatarTooltips />
    
    <div id="ServerInformation">
      <SplitPane split="vertical" minSize={200} defaultSize={300} maxSize={400} allowResize={true}>

      <Chatbar />

      <SplitPane split="vertical" minSize={"80%"} defaultSize={"80%"} allowResize={true}>
        <Chat />
        <Userbar />
      </SplitPane>

      </SplitPane>
    </div>
  </div>;
}

export default App;

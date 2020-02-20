import React from "react";
import { connect } from "react-redux";

import "./ServerBrowser.scss";
import Server from "./Components/Server/Server";
import AddServer from "./Components/AddServer/AddServer";

function ServersWheelEvent(event: React.WheelEvent<HTMLDivElement>) {
  const target = document.getElementsByClassName("servers")[0] as HTMLDivElement;

  target.scroll({
    behavior: "smooth",
    left: target.scrollLeft + (event.deltaY * 2)
  });
}

function ServerBrowser(props: any) {
  const ServerList = [];

  for (const server of props.ServerList) {
    const serverProps = {
      Server: server
    }
    ServerList.push(<Server key={server.Name + server.Id} {...serverProps} />);
  }

  return (
    <div id="ServerBrowser" className="bg-main">
      <div className="servers" onWheel={ServersWheelEvent}>
        {ServerList}
      </div>
      <AddServer />
    </div>
  );
}

export default connect(
  (state: any) => (state.ServerActionReducer),
)(ServerBrowser);


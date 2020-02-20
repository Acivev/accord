import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

import "./ServerBrowser.scss";
import { IServer } from "../../../API/v1/Server";

import 'Shared/ToolTips.scss';

function ServerBrowserToolTips(props: any) {
  const ServerListToolTips = [];

  for (const server of props.ServerList as IServer[]) {
    ServerListToolTips.push(
        <ReactTooltip id={"tooltip-server-" + server.Id}
                      effect='solid'
                      place={"bottom"}
                      className="custom"
                      offset={{bottom: 5}}>
            <span>
                {server.Name}
            </span>
        </ReactTooltip>);
  }

  return (
    <div id="ServerBrowserToolTips">
        {ServerListToolTips}

        <ReactTooltip id="tooltip-add-server"
                    effect='solid'
                    place={"bottom"}
                    className="custom"
                    offset={{bottom: 5}}>
                <span>
                    Add a Server!
                </span>
        </ReactTooltip>
    </div>
  );
}

export default connect(
  (state: any) => (state.ServerActionReducer),
)(ServerBrowserToolTips);


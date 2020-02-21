import React from 'react';
import { connect } from 'react-redux';

import "./Server.scss";
import { SetActiveServer } from '../../../../../Shared/Actions/ServerActions';
import { SiteStateStore } from '../../../../../Shared/Globals';
import { IServer } from '../../../../../API/v1/Servers/Server';

function Server(props: any) {
    let classes = "";

    const server: IServer = props.Server;
    const activeServer: IServer | null = props.ActiveServer;

    /* TODO: Implement
    if (props.HasMessage)
        classes += "message ";
    */

    if (server === activeServer)
        classes += "selected ";

    return (
        <div id="Server" onClick={_ => SiteStateStore.dispatch(SetActiveServer(server))} > {/* TODO: put this into an external function ? */}            
            <div data-tip data-for={"tooltip-server-" + server.Id} className={("icon " + classes).trim()}>
                <div className="indicator" />
            </div>
        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Server);

  

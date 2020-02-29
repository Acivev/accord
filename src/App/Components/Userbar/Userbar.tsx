import React from 'react';

import './Userbar.scss'
import { IServer } from './../../../API/v1/Servers/Server';
import { connect } from 'react-redux';
import { UserStatus } from '../../../API/v1/User';
import User from './Components/User/User';
import CurrentUser from './Components/CurrentUser/CurrentUser';

function Userbar(props: any) {
    const activeServer: IServer = props.ActiveServer;

    const OnlineUsers = [];
    const OfflineUsers = [];

    for (const user of activeServer.Users) {
        if (user.Status !== UserStatus.Offline)
            OnlineUsers.push(<User User={user}/>);
        else
            OfflineUsers.push(<User User={user}/>);
    }

    console.log(OnlineUsers);
    console.log(OfflineUsers);

    return (
        <div id="Userbar">
            
            <div className="OnlineCount">
                <span>Online</span>
                <span className="absolute right">{OnlineUsers.length}</span>
            </div>

            <div className="OnlineUsers">
                { OnlineUsers }
            </div>

            <div className="Bottom">
                <CurrentUser />
            </div>
        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Userbar);


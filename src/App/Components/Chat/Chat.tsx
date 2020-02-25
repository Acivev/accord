import React from 'react';

import './Chat.scss'
import { connect } from 'react-redux';
import { IServer } from './../../../API/v1/Servers/Server';
import { IChannel } from '../../../API/v1/Servers/Channel';
import Message from './Components/Message/Message';

function Chat(props: any) {
    const activeServer: IServer = props.ActiveServer;
    const channel: IChannel = props.ActiveChannel;

    if (channel === null || activeServer === null)
        return <div />;

    let messageHistory = []

    for (const message of channel.MessageHistory) {
        messageHistory.push(<Message Message={message} />)
    }

    return (
        <div id="Chat">
            {messageHistory}
        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Chat);

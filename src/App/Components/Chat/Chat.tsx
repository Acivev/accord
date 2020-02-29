import React from 'react';
import { connect } from 'react-redux';

import './Chat.scss'

import Message from './Components/Message/Message';
import { IServer } from './../../../API/v1/Servers/Server';
import { IChannel } from '../../../API/v1/Servers/Channel';

import 'Shared/EmojiMart.scss';
import ChatInput from './Components/ChatInput/ChatInput';

function Chat(props: any) {
    const activeServer: IServer = props.ActiveServer;
    const channel: IChannel = props.ActiveChannel;

    if (channel === null || activeServer === null)
        return <div />;

    let messageHistory = []

    for (const message of channel.MessageHistory) {
        messageHistory.push(<Message Message={message} key={message.Id} />)
    }

    return (
        <div id="Chat">
            <svg id="svg" style={{position: "absolute"}}>
                <defs>
                    <filter id="colorFilter">
                        <feColorMatrix 
                            colorInterpolationFilters="sRGB"
                            type="matrix"
                            values="0.12 0     0     0   0
                                    0    0.10  0     0   0
                                    0    0     0.15  0   0
                                    0    0     0     1   0 "/>
                    </filter>
                </defs>
            </svg>
            <div className="ChatWrapper">
                {messageHistory.reverse()}
            </div>

            <ChatInput />
        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Chat);

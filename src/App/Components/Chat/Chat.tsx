import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { connect } from 'react-redux';
import { Emoji, Picker } from 'emoji-mart';

import './Chat.scss'

import Message from './Components/Message/Message';
import { IServer } from './../../../API/v1/Servers/Server';
import { IChannel } from '../../../API/v1/Servers/Channel';
import { SiteStateStore } from '../../../Shared/Globals';
import { SendMessage } from './../../../Shared/Actions/ServerActions';

import 'Shared/EmojiMart.scss';


function OnSubmitChatMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.currentTarget;

    const textInput = target.getElementsByClassName("chatInput")[0].children[0] as HTMLInputElement;

    if (textInput.value)
        SiteStateStore.dispatch(SendMessage(textInput.value));

    textInput.value = "";
}

function Chat(props: any) {
    const [state, setState] = useState({
        IsPicking: false
    });

    const activeServer: IServer = props.ActiveServer;
    const channel: IChannel = props.ActiveChannel;

    if (channel === null || activeServer === null)
        return <div />;

    let messageHistory = []

    for (const message of channel.MessageHistory) {
        messageHistory.push(<Message Message={message} />)
    }

    const picker = <Picker autoFocus={true} set="twitter" title="Select an Emoji..." />

    return (
        <div id="Chat">
            <svg id="svg" style={{position: "absolute"}}>
                <defs>
                    <filter id="colorFilter">
                        <feColorMatrix 
                            color-interpolation-filters="sRGB"
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
            <form onSubmit={OnSubmitChatMessage}>
                <div className="uploadBtn"></div>
                <div className="chatInput">
                    <input placeholder="Type to Chat..."></input>
                </div>

                <OutsideClickHandler onOutsideClick={_ => setState({ IsPicking: false })}>
                { state.IsPicking ? picker : (<section />) }
            
                <div className={"EmojiPicker " + (state.IsPicking ? "active" : "")}>
                    <Emoji emoji=":smile:" size={32} onClick={_ => setState({ IsPicking: !state.IsPicking })}/>
                </div>
                </OutsideClickHandler>
            </form>
        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Chat);

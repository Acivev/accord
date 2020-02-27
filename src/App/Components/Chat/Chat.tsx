import React from 'react';

import './Chat.scss'
import { connect } from 'react-redux';
import { IServer } from './../../../API/v1/Servers/Server';
import { IChannel } from '../../../API/v1/Servers/Channel';
import Message from './Components/Message/Message';

import 'Shared/EmojiMart.scss';
import { SiteStateStore } from '../../../Shared/Globals';
import { SendMessage } from './../../../Shared/Actions/ServerActions';
import { Emoji } from 'emoji-mart';

function OnSubmitChatMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.currentTarget;

    const textInput = target.getElementsByClassName("chatInput")[0].children[0] as HTMLInputElement;

    if (textInput.value)
        SiteStateStore.dispatch(SendMessage(textInput.value));

    textInput.value = "";
}

function Chat(props: any) {
    const activeServer: IServer = props.ActiveServer;
    const channel: IChannel = props.ActiveChannel;

    if (channel === null || activeServer === null)
        return <div />;

    let messageHistory = []

    for (const message of channel.MessageHistory) {
        messageHistory.push(<Message Message={message} />)
    }

    //const picker = <Picker autoFocus={true} set="twitter" title="Select an Emoji..." />

    return (
        <div id="Chat">
            <div className="ChatWrapper">
                {messageHistory.reverse()}
            </div>
            <form onSubmit={OnSubmitChatMessage}>
                <div className="uploadBtn"></div>
                <div className="chatInput">
                    <input placeholder="Type to Chat..."></input>
                </div>
            </form>
        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Chat);

import React from "react";
import TimeAgo from "react-timeago";

import "./Message.scss";

import { IMessage } from "../../../../../API/v1/Servers/Channel";
import Avatar from "../../../Shared/Avatar/Avatar";

export interface MessageProps extends React.Props<MessageProps> {
    Message: IMessage
}

function Message(props: MessageProps) {
    return (
        <div id="Message" >
            <Avatar className="avatar" User={props.Message.User} />
            
            <div className="right">
                <div className="identity">
                    <span className="name">{props.Message.User.Name} <span className="identifier">#{props.Message.User.Identifier}</span></span>
                </div>
                <span className="message">{props.Message.Message}<span className="timeAgo"><TimeAgo date={props.Message.Timestamp} live={true}/></span></span>
            </div>
        </div>
    );
}

export default Message;

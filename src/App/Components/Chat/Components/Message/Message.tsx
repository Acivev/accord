import React from "react";
import TimeAgo from "react-timeago";

import "./Message.scss";

import { IMessage } from "../../../../../API/v1/Servers/Channel";
import Avatar from "../../../Shared/Avatar/Avatar";
import { Emoji } from "emoji-mart";

export interface MessageProps extends React.Props<MessageProps> {
    Message: IMessage
}

function Message(props: MessageProps) {
    const regex = new RegExp("(^|\\s)(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)", "g");

    const msg = [];

    let lastOffset = 0;
    let match = regex.exec(props.Message.Message.trim());
    while (match) {
        const previousText = props.Message.Message.substring(
            lastOffset,
            match.index
        );

        if (previousText.length)
            msg.push(<span className="msgPart" key={match.index + previousText}>{previousText}</span>);

        lastOffset = match.index + match[0].length;

        const emoji = (
            <Emoji
                tooltip={true}
                emoji={match[0].trim()}
                fallback={((emoji: any, props: any) => { // Let's hack the world.
                    return emoji ? `:${emoji.short_names[0]}:` : props.emoji;
                }) as any}
                size={22}
                key={match.index + lastOffset}
            />
        );

        if (emoji) {
            msg.push(emoji);
        } else {
            msg.push(<span key={match.index + match[0]} className="msgPart">{match[0]}</span>);
        }
        
        match = regex.exec(props.Message.Message);
        if (!match)
            break;
    }

    if (lastOffset === 0)
        msg.push(<span className="msgPart" key={props.Message.Message}>{props.Message.Message}</span>);

    return (
        <div id="Message" >
            <Avatar className="avatar" User={props.Message.User} />
            
            <div className="right">
                <div className="identity">
                    <span className="name">{props.Message.User.Name} <span className="identifier">#{props.Message.User.Identifier}</span></span>
                </div>
                <span className="message">{msg}<span className="timeAgo"><TimeAgo date={props.Message.Timestamp} live={true}/></span></span>
            </div>
        </div>
    );
}

export default Message;

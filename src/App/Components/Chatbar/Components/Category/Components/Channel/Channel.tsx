import React, { Props } from 'react';

import './Channel.scss'
import { IChannel } from '../../../../../../../API/v1/Servers/Channel';

export interface ChannelProps extends Props<ChannelProps> {
    Channel: IChannel,
}

function Channel(props: ChannelProps) {
    const channel: IChannel = props.Channel;
    
    return (
        <div id="Channel">
            <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.08806 4.01604L-0.233912 7.24441L-0.144869 0.63665L5.08806 4.01604Z" fill="white"/>
            </svg>

            <span className="icon">#</span>
            <span className="name">{channel.Name.toLowerCase().replace(/ /g, "_")}</span>
        </div>
    )
}

export default Channel;

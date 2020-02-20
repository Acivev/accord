import React, { Props } from 'react';

import './Channel.scss'
import { IChannel } from '../../../../../../../API/v1/Channel';

export interface ChannelProps extends Props<ChannelProps> {
    Channel: IChannel
}

function Channel(props: ChannelProps) {
    const channel: IChannel = props.Channel;
    
    return (
        <div id="Channel">
            <span className="icon">#</span>
            <span className="name">{channel.Name.toLowerCase().replace(/ /g, "_")}</span>
        </div>
    )
}

export default Channel;

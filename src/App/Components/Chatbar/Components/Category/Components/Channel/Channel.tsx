import React, { Props } from 'react';

import './Channel.scss'
import { IChannel } from '../../../../../../../API/v1/Servers/Channel';

import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import { SiteStateStore } from './../../../../../../../Shared/Globals';
import { VoiceJoin } from './../../../../../../../Shared/Actions/VoiceActions';
import VoiceChannelUser from './Components/VoiceChannelUser/VoiceChannelUser';
import { connect } from 'react-redux';
import { SetActiveChannel } from './../../../../../../../Shared/Actions/ServerActions';

export interface ChannelProps extends Props<ChannelProps> {
    Channel: IChannel,
}

function Channel(props: ChannelProps) {
    const channel: IChannel = props.Channel;
    const voiceUsers = [];
    
    for (const voiceUser of channel.VoiceConnectedUsers) {
        voiceUsers.push(<VoiceChannelUser User={voiceUser}/>)
    }

    return (
        <div id="Channel" onClick={_ => SiteStateStore.dispatch(SetActiveChannel(channel))}>
            <svg className="notification" width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.08806 4.01604L-0.233912 7.24441L-0.144869 0.63665L5.08806 4.01604Z" fill="white"/>
            </svg>

            <span className="icon">#</span>
            <span className={"name"}>{channel.Name.toLowerCase().replace(/ /g, "_")}</span>
            <HeadsetMicIcon data-tip data-for="tooltip-voice-join" className="voiceJoin" onClick={_ => SiteStateStore.dispatch(VoiceJoin(channel))}/>
            
            <div className="voiceUsers">
                {voiceUsers}
            </div>
        
        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Channel);


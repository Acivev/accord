import React, { Props } from "react";

import "./VoiceChannelUser.scss";
import { IUser } from './../../../../../../../../../API/v1/User';

import SampleImage from './SampleImage.png';

export interface VoiceUserProps extends Props<VoiceUserProps> {
    User: IUser
}

function VoiceChannelUser(props: VoiceUserProps) {
    // TODO: Implement
    return (
        <div id="VoiceChannelUser">
        </div>
    );
}

export default VoiceChannelUser;

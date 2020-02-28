import React, { Props } from "react";

import "./VoiceChannelUser.scss";
import { IUser } from './../../../../../../../../../API/v1/User';
import Avatar from "../../../../../../../Shared/Avatar/Avatar";

// import SampleImage from './SampleImage.png';

export interface VoiceUserProps extends Props<VoiceUserProps> {
    User: IUser
}

function VoiceChannelUser(props: VoiceUserProps) {
    // TODO: Implement
    return (
        <div id="VoiceChannelUser">
            <Avatar User={props.User} />
        </div>
    );
}

export default VoiceChannelUser;

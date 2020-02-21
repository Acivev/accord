import React from "react";
import { connect } from "react-redux";

import "./VoiceButtons.scss";

import PhoneDisabledIcon from '@material-ui/icons/PhoneDisabled';
import HeadsetIcon from '@material-ui/icons/Headset';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import MicIcon from '@material-ui/icons/Mic';

import { SiteStateStore } from "../../../../../Shared/Globals";
import { VoiceToggleMute, VoiceToggleDeafen, VoiceLeave } from './../../../../../Shared/Actions/VoiceActions';

function ToggleMic(e: any) {
    SiteStateStore.dispatch(VoiceToggleMute());
}

function DeafenMic(e: any) {
    SiteStateStore.dispatch(VoiceToggleDeafen());
}

function VoiceButtons(props: any) {
    let micIcon;
    let deafIcon;
    let leaveIcon;

    // TODO: Add some fancy sounds!
    if (props.Muted)
        micIcon = <MicIcon data-tip data-for="tooltip-mic-off" className="mic muted" onClick={ToggleMic} />;
    else
        micIcon = <MicIcon data-tip data-for="tooltip-mic" className="mic" onClick={ToggleMic} />;
    
    if (props.Deafen)
        deafIcon = <HeadsetIcon data-tip data-for="tooltip-headphones-off" className="headphones deafen" onClick={DeafenMic} />;
    else
        deafIcon = <HeadsetIcon data-tip data-for="tooltip-headphones" className="headphones" onClick={DeafenMic} />;
    
    if (props.ActiveServer != null)
        leaveIcon = <PhoneDisabledIcon data-tip data-for="tooltip-hangup" className="hangup" onClick={_ => SiteStateStore.dispatch(VoiceLeave())} />;

    return (
        <div id="VoiceButtons" >
           
            <div className="left">
                <ScreenShareIcon data-tip data-for="tooltip-screenshare" className="screenshare" />
            </div>

            <div className="right">
                {micIcon}
                {deafIcon}
                {leaveIcon}
            </div>

        </div>
    );
}

export default connect(
    (state: any) => (state.VoiceActionReducer),
)(VoiceButtons);


import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

import "Shared/ToolTips.scss";

function VoiceButtonsTooltips(props: any) {
    let micToolTip;
    let deafToolTip;

    // TODO: Add some fancy sounds!
    if (props.Muted)
        micToolTip = <ReactTooltip id="tooltip-mic-off" effect="solid" place={"top"} className="custom"><span>Unmute</span></ReactTooltip>;
    else
        micToolTip = <ReactTooltip id="tooltip-mic" effect="solid" place={"top"} className="custom"><span>Mute</span></ReactTooltip>;
    
    if (props.Deafen)
        deafToolTip = <ReactTooltip id="tooltip-headphones-off" effect="solid" place={"top"} className="custom"><span>Undeafen</span></ReactTooltip>;
    else
        deafToolTip = <ReactTooltip id="tooltip-headphones" effect="solid" place={"top"} className="custom"><span>Deafen</span></ReactTooltip>;


    return (
        <div id="VoiceButtonsTooltips" >
            <ReactTooltip id="tooltip-screenshare"
                effect="solid"
                place={"top"}
                className="custom">
                <span>
                    Screenshare
                </span>
            </ReactTooltip>

            {micToolTip}
            {deafToolTip}

            <ReactTooltip id="tooltip-hangup"
                effect="solid"
                place={"top"}
                className="custom">
                <span>
                    Hangup
                </span>
            </ReactTooltip>
        </div>
    );
}

export default connect(
    (state: any) => (state.VoiceActionReducer),
)(VoiceButtonsTooltips);

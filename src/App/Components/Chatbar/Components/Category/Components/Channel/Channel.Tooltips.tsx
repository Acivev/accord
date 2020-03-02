import React from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

import "Shared/ToolTips.scss";

function VoiceButtonsTooltips(props: any) {

    return (
        <div id="VoiceButtonsTooltips" >
            <ReactTooltip id="tooltip-voice-join"
                effect="solid"
                place={"top"}
                className="custom">
                <span>
                    Join Voice
                </span>
            </ReactTooltip>
        </div>
    );
}

export default connect(
    (state: any) => (state.VoiceActionReducer),
)(VoiceButtonsTooltips);

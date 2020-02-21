import React from "react";
import ReactTooltip from "react-tooltip";

import 'Shared/ToolTips.scss';

function VoiceButtonsTooltips() {
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

            <ReactTooltip id="tooltip-mic"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Mute
                </span>
            </ReactTooltip>

            <ReactTooltip id="tooltip-mic-off"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Unmute
                </span>
            </ReactTooltip>

            <ReactTooltip id="tooltip-headphones"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Deafen
                </span>
            </ReactTooltip>

            <ReactTooltip id="tooltip-headphones-off"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Undeafen
                </span>
            </ReactTooltip>

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

export default VoiceButtonsTooltips;

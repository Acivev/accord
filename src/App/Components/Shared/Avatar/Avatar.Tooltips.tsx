import React from "react";
import ReactTooltip from "react-tooltip";

import 'Shared/ToolTips.scss';

function AvatarTooltips() {
    return (
        <div id="AvatarTooltips" >
            <ReactTooltip id="tooltip-status-active"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Active
                </span>
            </ReactTooltip>

            <ReactTooltip id="tooltip-status-away"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Away
                </span>
            </ReactTooltip>

            <ReactTooltip id="tooltip-status-busy"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Busy
                </span>
            </ReactTooltip>

            <ReactTooltip id="tooltip-status-offline"
                    effect="solid"
                    place={"top"}
                    className="custom">
                <span>
                    Offline
                </span>
            </ReactTooltip>
        </div>
    );
}

export default AvatarTooltips;

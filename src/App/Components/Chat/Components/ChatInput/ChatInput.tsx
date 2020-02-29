import React, { useState } from "react";

import "./ChatInput.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { Picker, Emoji } from "emoji-mart";
import { SiteStateStore } from "../../../../../Shared/Globals";
import { SendMessage } from "../../../../../Shared/Actions/ServerActions";

function OnSubmitChatMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.currentTarget;

    const textInput = target.getElementsByClassName("chatInput")[0].children[0] as HTMLInputElement;

    if (textInput.value)
        SiteStateStore.dispatch(SendMessage(textInput.value));

    textInput.value = "";
}

function ChatInput() {
    const [state, setState] = useState({
        IsPicking: false
    });
    
    const picker = <Picker autoFocus={true} set="twitter" title="Select an Emoji..." />
    
    return (
        <div id="ChatInput" >
            <form onSubmit={OnSubmitChatMessage}>
                <div className="uploadBtn"></div>
                <div className="chatInput">
                    <input placeholder="Type to Chat..."></input>
                </div>

                <OutsideClickHandler onOutsideClick={_ => setState({ IsPicking: false })}>
                { state.IsPicking ? picker : (<section />) }
            
                <div className={"EmojiPicker " + (state.IsPicking ? "active" : "")}>
                    <Emoji emoji=":smile:" size={32} onClick={(_: any) => setState({ IsPicking: !state.IsPicking })}/>
                </div>
                </OutsideClickHandler>
            </form>
        </div>
    );
}

export default ChatInput;

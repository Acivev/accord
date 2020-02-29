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
                <div className="uploadBtn">
                    <svg className="foreground" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.89996 6.90002V0.666687L9.09996 0.666687V6.90002L15.3333 6.90967V9.0156H9.09996L9.04758 15.3334H6.95234L6.89996 9.0156H0.666626L0.666626 6.90002H6.89996Z" fill="white"/>
                    </svg>
                </div>
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

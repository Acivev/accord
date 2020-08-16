import React from "react";
import { connect } from "react-redux";

import "./Chatbar.scss";
import ServerImage from "./Components/ServerImage/ServerImage";
import { IServer } from "../../../API/v1/Servers/Server";
import Category from "./Components/Category/Category";
import VoiceButtons from "./Components/VoiceButtons/VoiceButtons";

function Chatbar(props: any) {
    if (!props.ActiveServer)
        return <div />;

    const activeServer: IServer = props.ActiveServer;

    const categoryList = [];

    for (const category of activeServer.Categories) {
        categoryList.push(<Category key={category.Id} {...{Category: category}} />);
    }

    return (
        <div id="Chatbar">
            <ServerImage />
            
            <div className="list">
                { categoryList }
            </div>

            <div className="voice">
                <VoiceButtons />
            </div>

        </div>
    );
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Chatbar);

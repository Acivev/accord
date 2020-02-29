import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.scss";

import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { SiteStateStore } from "./Shared/Globals";
import { SampleServerList, SetActive, SampleLocalUser } from './Shared/Actions/ServerActions';
import { Emoji } from 'emoji-mart';

// TODO: Remove and replace with Proper API
SiteStateStore.dispatch(SampleServerList());
SiteStateStore.dispatch(SampleLocalUser());
SiteStateStore.dispatch(SetActive(SiteStateStore.getState().ServerActionReducer.ServerList[0]))

if (Emoji.defaultProps) {
    if (Emoji.defaultProps.set) 
        Emoji.defaultProps.set = "twitter";
        
    if (Emoji.defaultProps.backgroundImageFn) 
        Emoji.defaultProps.backgroundImageFn('twitter', 64);
}


ReactDOM.render(
    <Provider store={SiteStateStore}>
        <App />
    </Provider>,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";

// Global style
import "./index.scss";

import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { SiteStateStore } from "./Shared/Globals";
import { SampleServerList } from './Shared/Actions/ServerActions';

// TODO: Remove and replace with Proper API
SiteStateStore.dispatch(SampleServerList(5));

ReactDOM.render(
    <Provider store={SiteStateStore}>
        <App />
    </Provider>,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

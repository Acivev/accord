import { combineReducers, createStore } from "redux";
import { ServerActionReducer } from "./Actions/ServerActions";
import { VoiceActionReducer } from "./Actions/VoiceActions";

const AllReducer = combineReducers({
    ServerActionReducer,
    VoiceActionReducer
});

export const SiteStateStore = createStore(AllReducer,
    // Redux debugger
    (window as any).__REDUX_DEVTOOLS_EXTENSION__&& (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

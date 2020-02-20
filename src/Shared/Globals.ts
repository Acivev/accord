import { combineReducers, createStore } from "redux";
import { ServerActionReducer } from "./Actions/ServerActions";

const AllReducer = combineReducers({
    ServerActionReducer,
});

export const SiteStateStore = createStore(AllReducer);

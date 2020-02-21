import { AnyAction, Reducer } from "redux";
import { IServer } from "../../API/v1/Servers/Server";


// Dispatchable Events
import sampleData from './sample_data.json';
import { ICategory } from './../../API/v1/Servers/Chat';

export interface IServerActionState {
    ActiveServer: IServer | null

    ServerList: IServer[]

    HiddenCategories: ICategory[]
}

export enum ServerActions {
    UPDATE = "server.list.update",

    SET_ACTIVE = "server.active.set",
    HIDE_CATEGORY = "server.category.hide",
    SHOW_CATEGORY = "server.category.show",
}

export interface IServerAction extends AnyAction, IServerActionState { }

const EmptyServerList: IServerActionState = {
    ActiveServer: null,
    HiddenCategories: [],
    ServerList: []
};

export const ServerActionReducer: Reducer<IServerActionState, IServerAction> =
    (state = EmptyServerList, action: IServerAction) => {
        switch (action.type) {
            case ServerActions.UPDATE:
                return { 
                    ActiveServer: state.ActiveServer,
                    ServerList: action.ServerList,
                    HiddenCategories: state.HiddenCategories
                };

            case ServerActions.SET_ACTIVE:
                return {
                    ActiveServer: action.ActiveServer,
                    ServerList: state.ServerList,
                    HiddenCategories: state.HiddenCategories
                };

            case ServerActions.HIDE_CATEGORY:
                return {
                    ActiveServer: state.ActiveServer,
                    ServerList: state.ServerList,
                    HiddenCategories: state.HiddenCategories.concat(action.HiddenCategories)
                }

            case ServerActions.SHOW_CATEGORY:
                return {
                    ActiveServer: state.ActiveServer,
                    ServerList: state.ServerList,
                    HiddenCategories: state.HiddenCategories.filter((el) => !action.HiddenCategories.includes(el))
                }

            default:
                return state;
        }
    };

export const SampleServerList = () => {
    const list: IServer[] = sampleData.Servers;

    return { type: ServerActions.UPDATE, ServerList: list } as IServerAction;
}

export const SetActiveServer = (server: IServer) => {
    return { type: ServerActions.SET_ACTIVE, ActiveServer: server } as IServerAction;
}

export const HideCategory = (category: ICategory) => {
    return { type: ServerActions.HIDE_CATEGORY, HiddenCategories: [category] } as IServerAction;
}

export const ShowCategory = (category: ICategory) => {
    return { type: ServerActions.SHOW_CATEGORY, HiddenCategories: [category] } as IServerAction;
}


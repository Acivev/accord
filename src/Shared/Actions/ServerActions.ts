import { AnyAction, Reducer } from "redux";
import { IServer } from "../../API/v1/Server";

export interface IServerActionState {
    ActiveServer: IServer | null

    ServerList: IServer[]
}

export enum ServerActions {
    UPDATE = "server.list.update",

    SET_ACTIVE = "server.active.set",
}

export interface IServerAction extends AnyAction, IServerActionState { }




const EmptyServerList: IServerActionState = {
    ActiveServer: null,
    ServerList: []
};

export const ServerActionReducer: Reducer<IServerActionState, IServerAction> =
    (state = EmptyServerList, action: IServerAction) => {
        switch (action.type) {
            case ServerActions.UPDATE:
                return { 
                    ActiveServer: state.ActiveServer,
                    ServerList: action.ServerList
                };

            case ServerActions.SET_ACTIVE:
                return {
                    ActiveServer: action.ActiveServer,
                    ServerList: state.ServerList
                };

            default:
                return state;
        }
    };



// Dispatchable Events

export const SampleServerList = (n: number) => {
    const list: IServer[] = [];

    for (let i = 0; i < n; i++) {
        list.push({
            Id: i,
            Name: "Server " + i,
            Logo: {
                File: null,
                Hash: ""
            }
        })
    }

    return { type: ServerActions.UPDATE, ServerList: list } as IServerAction;
}

export const SetActiveServer = (server: IServer) => {
    return { type: ServerActions.SET_ACTIVE, ActiveServer: server } as IServerAction;
}


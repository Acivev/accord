import { AnyAction, Reducer } from "redux";
import { IServer } from "../../API/v1/Servers/Server";


// Dispatchable Events
import sampleData from './sample_data.json';
import { ICategory } from './../../API/v1/Servers/Chat';
import { IChannel } from "../../API/v1/Servers/Channel";
import { IUser } from "../../API/v1/User";

export interface IServerActionState {
    LocalUser: IUser | null
    ActiveServer: IServer | null
    ActiveChannel: IChannel | null

    ServerList: IServer[]

    HiddenCategories: ICategory[],

    _shallow: Date
}

export enum ServerActions {
    UPDATE = "server.list.update",

    SET_ACTIVE = "server.active.set",
    HIDE_CATEGORY = "server.category.hide",
    SHOW_CATEGORY = "server.category.show",

    SEND_MESSAGE = "server.message.send",
}

export interface IServerAction extends AnyAction, IServerActionState { }

const EmptyServerList: IServerActionState = {
    LocalUser: null,
    ActiveServer: null,
    ActiveChannel: null,

    HiddenCategories: [],
    ServerList: [],
    
    _shallow: new Date(),
};

export const ServerActionReducer: Reducer<IServerActionState, IServerAction> =
    (state = EmptyServerList, action: IServerAction) => {
        switch (action.type) {
            case ServerActions.UPDATE:
                return {
                    ...state,

                    ServerList: action.ServerList,
                };

            case ServerActions.SET_ACTIVE:
                return {
                    ...state,

                    LocalUser: !action.LocalUser ? state.LocalUser : action.LocalUser,

                    ActiveServer: !action.ActiveServer ? state.ActiveServer : action.ActiveServer,
                    ActiveChannel: action.ActiveChannel,
                };

            case ServerActions.HIDE_CATEGORY:
                return {
                    ...state,

                    HiddenCategories: state.HiddenCategories.concat(action.HiddenCategories),
                }

            case ServerActions.SHOW_CATEGORY:
                return {
                    ...state,

                    HiddenCategories: state.HiddenCategories.filter((el) => !action.HiddenCategories.includes(el)),
                }

            case ServerActions.SEND_MESSAGE:
                let hasChanged = false;

                if (state.ActiveChannel && state.LocalUser != null) {
                    state.ActiveChannel.MessageCount++;
                    state.ActiveChannel.MessagesRead++;

                    state.ActiveChannel.MessageHistory.push({
                        Id: state.ActiveChannel.MessageHistory.length, // TODO: fetch Id from API
                        Timestamp: new Date().getTime(),
                        Message: action.Message,
                        User: state.LocalUser
                    });

                    hasChanged = true;
                } // else put error message... TODO: Implement Error Message
                // TODO: Implement Server side API

                return {
                    ...state,
                    _shallow: hasChanged? new Date() : state._shallow,
                };

            default:
                return state;
        }
    };

export const SampleServerList = () => {
    const list: IServer[] = sampleData.Servers;

    return { type: ServerActions.UPDATE, ServerList: list } as IServerAction;
}

export const SampleLocalUser = () => {
    const user: IUser = sampleData.LocalUser;

    return SetActive(null, user);
}


export const SetActive = (server: IServer | null, user: IUser | null = null) => {
    return { type: ServerActions.SET_ACTIVE, ActiveChannel: null, ActiveServer: server, LocalUser: user } as IServerAction;
}

export const SetActiveChannel = (channel: IChannel) => {
    return { type: ServerActions.SET_ACTIVE, ActiveChannel: channel, ActiveServer: null } as IServerAction;
}

export const HideCategory = (category: ICategory) => {
    return { type: ServerActions.HIDE_CATEGORY, HiddenCategories: [category] } as IServerAction;
}

export const ShowCategory = (category: ICategory) => {
    return { type: ServerActions.SHOW_CATEGORY, HiddenCategories: [category] } as IServerAction;
}

export const SendMessage = (message: string) => {
    return { type: ServerActions.SEND_MESSAGE, Message: message } as unknown as IServerAction;
}

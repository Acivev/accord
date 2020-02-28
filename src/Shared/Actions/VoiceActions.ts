import { AnyAction, Reducer } from "redux";

import { IServer } from "../../API/v1/Servers/Server";
import { IChannel } from "../../API/v1/Servers/Channel";
import { SiteStateStore } from './../Globals';
import { IUser } from "../../API/v1/User";
import { ServerActions, IServerAction } from "./ServerActions";

export interface IVoiceActionState {
    LocalUser: IUser | null
    ActiveServer: IServer | null
    ActiveChannel: IChannel | null

    ScreenSharing: boolean

    Muted: boolean
    Deafen: boolean
}

export enum VoiceActions {
    JOIN = "voice.join",
    LEAVE = "voice.leave",

    TOGGLE_MUTE = "voice.mute.toggle",
    TOGGLE_DEAFEN = "voice.deafen.toggle",
}

export interface IVoiceAction extends AnyAction, IVoiceActionState { }

const EmptyVoiceActionState: IVoiceActionState = {
    LocalUser: null,
    ActiveServer: null,
    ActiveChannel: null,

    Deafen: false,
    Muted: false,
    ScreenSharing: false,
};

export const VoiceActionReducer: Reducer<IVoiceActionState, IVoiceAction> =
    (state = EmptyVoiceActionState, action: IVoiceAction) => {
        switch (action.type) {

            case VoiceActions.JOIN:
            {
                // TODO: Implement API Voice Join.
                // TODO: Implement an Audio Indicator.

                const localUser = state.LocalUser;
                let activeChannel = action.ActiveChannel;

                setTimeout(() => { // if another channel was joined before, leave.
                    SiteStateStore.dispatch({type: VoiceActions.LEAVE, ActiveChannel: state.ActiveChannel} as IServerAction);
                }, 100);

                if (activeChannel && localUser && !activeChannel.VoiceConnectedUsers.includes(localUser)) // TODO: show Error Message if false
                    activeChannel.VoiceConnectedUsers.push(localUser);

                // Lets hack the Matrix. dirty but works.
                setTimeout(() => {
                    SiteStateStore.dispatch({type: ServerActions.SHALLOW} as IServerAction);
                }, 0);

                return {
                    LocalUser: action.LocalUser,
                    Muted: state.Muted, Deafen: state.Deafen, ScreenSharing: false,
                    ActiveServer: action.ActiveServer, ActiveChannel: action.ActiveChannel }
            }

            case VoiceActions.LEAVE:
            {
                // TODO: Implement API Voice Leave.
                // TODO: Implement an Audio Indicator.

                const localUser = state.LocalUser;
                const activeChannel = action.ActiveChannel ? action.ActiveChannel : state.ActiveChannel;

                if (activeChannel && localUser)
                    activeChannel.VoiceConnectedUsers = activeChannel.VoiceConnectedUsers.filter((el) => el !== localUser);

                // Lets hack the Matrix. dirty but works.
                setTimeout(() => {
                    SiteStateStore.dispatch({type: ServerActions.SHALLOW} as IServerAction);
                }, 0);

                return {
                    LocalUser: state.LocalUser,
                    Muted: state.Muted, Deafen: state.Deafen, ScreenSharing: false,
                    ActiveServer: null, ActiveChannel: null }
            }


            case VoiceActions.TOGGLE_MUTE:
            {
                // TODO: Implement Voice Mute.
                // TODO: Implement an Audio Indicator.
                return {
                    LocalUser: state.LocalUser,
                    Muted: !state.Muted, Deafen: state.Deafen, ScreenSharing: state.ScreenSharing,
                    ActiveServer: state.ActiveServer, ActiveChannel: state.ActiveChannel }
            }


            case VoiceActions.TOGGLE_DEAFEN:
            {
                // TODO: Implement Voice Deafen.
                // TODO: Implement an Audio Indicator.
                return {
                    LocalUser: state.LocalUser,
                    Muted: state.Muted, Deafen: !state.Deafen, ScreenSharing: state.ScreenSharing,
                    ActiveServer: state.ActiveServer, ActiveChannel: state.ActiveChannel }
            }

            default:
                return state;
        }
    };

export const VoiceToggleMute = () => {
    return { type: VoiceActions.TOGGLE_MUTE } as IVoiceAction;
}

export const VoiceToggleDeafen = () => {
    return { type: VoiceActions.TOGGLE_DEAFEN } as IVoiceAction;
}

export const VoiceLeave = () => {
    return { type: VoiceActions.LEAVE } as IVoiceAction;
}

export const VoiceJoin = (localUser: IUser, channel: IChannel) => {
    return { type: VoiceActions.JOIN,
        LocalUser: localUser,
        ActiveServer: SiteStateStore.getState().ServerActionReducer.ActiveServer,
        ActiveChannel: channel } as IVoiceAction;
}

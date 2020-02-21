import { AnyAction, Reducer } from "redux";

import { IServer } from "../../API/v1/Servers/Server";
import { IChannel } from "../../API/v1/Servers/Channel";

export interface IVoiceActionState {
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
                // TODO: Implement Voice Join.
                return {
                    Muted: state.Muted, Deafen: state.Deafen, ScreenSharing: false,
                    ActiveServer: action.ActiveServer, ActiveChannel: action.ActiveChannel }

            case VoiceActions.LEAVE:
                // TODO: Implement Voice Leave.
                return {
                    Muted: state.Muted, Deafen: state.Deafen, ScreenSharing: false,
                    ActiveServer: null, ActiveChannel: null }

            case VoiceActions.TOGGLE_MUTE:
                // TODO: Implement Voice Mute.
                return {
                    Muted: !state.Muted, Deafen: state.Deafen, ScreenSharing: state.ScreenSharing,
                    ActiveServer: state.ActiveServer, ActiveChannel: state.ActiveChannel }

            case VoiceActions.TOGGLE_DEAFEN:
                // TODO: Implement Voice Deafen.
                return {
                    Muted: state.Muted, Deafen: !state.Deafen, ScreenSharing: state.ScreenSharing,
                    ActiveServer: state.ActiveServer, ActiveChannel: state.ActiveChannel }

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

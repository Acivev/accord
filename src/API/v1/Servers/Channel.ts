import { IUser } from "../User";

export enum ChannelType {
    Text = 0
}

export interface IChannel {
    Id: number
    Name: string
    Topic: string

    VoiceConnectedUsers: IUser[]

    MessageCount: number
    MessagesRead: number
    MessageHistory: IMessage[]
}

export interface IMessage {
    Id: number
    User: IUser,
    Message: string,
    Timestamp: number
}

import { IIcon } from '../Image';
import { IUser } from '../User';

export enum ChannelType {
    Text = 0,
    Voice = 1
}

export interface IChannel {
    Id: number
    Name: string
    Topic: string

    ChannelIcon: IIcon

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

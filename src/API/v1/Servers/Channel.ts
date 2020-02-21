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

    ChannelType: ChannelType

    MessageHistory: ({
        Id: number
        User: IUser,
        Message: string
    })[]
}

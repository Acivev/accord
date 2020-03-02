import { IChannel } from "./Channel";

export interface ICategory {
    Id: number,
    Name: string
    SubChannels: IChannel[]
}

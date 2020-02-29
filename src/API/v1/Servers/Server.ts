import { IImage } from '../Image';
import { ICategory } from './Chat';
import { IUser } from '../User';

export interface IServer {
    Id: number
    Name: string

    Categories: ICategory[]
    Users: IUser[]

    Logo: IImage
}
import { IImage } from './Image';
import { ICategory } from './Chat';

export interface IServer {
    Id: number
    Name: string

    Categories: ICategory[]

    Logo: IImage
}
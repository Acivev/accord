export enum UserStatus {
    Active  = 0,
    Busy    = 1,
    Away    = 2,
    Offline = 3
}

export interface IUser {
    Id: number
    Name: string
    Identifier: number // #4492
    Status: UserStatus
}
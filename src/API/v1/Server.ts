export interface IServer {
    Id: number,
    Name: string,

    Logo: {
        File: string | null,
        Hash: string
    }
}
export interface IImage {
    File: string | null // URL to Image
    Hash: string        // Hash of Image
}

export interface IIcon {
    Id: number
    Name: string

    Emote?: string
    Image?: IImage | null
}

import { encode, decode } from "@msgpack/msgpack";
import { SiteStateStore } from "../Shared/Globals";
import { SetActive, ServerActions, IServerAction } from "../Shared/Actions/ServerActions";
import { IUser } from "./v1/User";
import { IServer } from "./v1/Servers/Server";
import { callbackify } from "util";
import { IImage } from "./v1/Image";
import { ICategory } from "./v1/Servers/Chat";
import { IChannel } from "./v1/Servers/Channel";

export enum APIOpCodes {
    // OpUnknown is an unknown OpCode and is the default in case our code doesn't exists
    OpUnknown = 0,

	// OpHello used on the first connection
	// {  }
	OpHello = 1,

	// OpReqAuth request authentification using existing user token
	OpReqAuth = 2,
	// OpAckAuth acknowledges authetification and returns it's user id
	// { Snowflake }
	OpAckAuth = 3,

	// OpReqServerList request it's own ServerList from our Database
	// {  }
	OpReqServerList = 4,
	// OpAckServerList acknowledges the request and returns a server list
	// {  }
	OpAckServerList = 5,

	// OpReqUser request it's own User Information from our Database
	// {  }
	OpReqUser = 6,
	// OpAckUser acknowledges the request and returns our user information
	// {  }
    OpAckUser = 7,
    
    OpReqServer = 8,
    OpAckServer = 9,

    OpReqCategory = 10,
    OpAckCategory = 11,

    OpReqChannel = 12,
    OpAckChannel = 13,
}

export class APIClient {
    private ws: WebSocket | undefined;

    private local_user_id = -1;
    private callbacks: any = {  };
    private _last_callback = 0;

    private cached_users: any = {  };
    
    constructor() {
        this.Connect();
    }

    public Connect() {
        this.ws = new WebSocket("ws://localhost:4923/v0/ws");

        this.ws.onopen = () => {
            this.Hello();
        };

        this.ws.onclose = () => {
            this.Connect();
        };

        this.ws.onmessage = async (ev) => {
            await this.Receive(ev.data);
        };
    }
    
    public Send(op: APIOpCodes, callbackId: number, callback: Function|undefined, data: unknown = undefined) {
        if (callback) this.callbacks[callbackId.toString()] = callback;

        this.ws?.send(encode({
            Op: op,
            Cb: callbackId,
            Data: !data ? undefined : encode(data)
        }, {
            ignoreUndefined: true
        }));
    }

    private async Receive(data: any) {
        const opMsg: { Op: APIOpCodes, Cb: number, Data?: ArrayBuffer } = decode(await data.arrayBuffer()) as any;
        const callback: any = this.callbacks[opMsg.Cb.toString()];

        switch (opMsg.Op) {
        case APIOpCodes.OpHello: this.ReqAuth(); break;
        case APIOpCodes.OpAckAuth: 
            {
                this.local_user_id = decode(opMsg.Data as ArrayBuffer) as number;

                console.log(await this.cacheUser(this.local_user_id));

                SiteStateStore.dispatch(SetActive(null, await this.cacheUser(this.local_user_id)));

                this.UpdateServerList();
            }break;
        case APIOpCodes.OpAckUser:
        case APIOpCodes.OpAckServerList:
        case APIOpCodes.OpAckChannel:
        case APIOpCodes.OpAckServer:
        case APIOpCodes.OpAckCategory:
            {
                const value = decode(opMsg.Data as ArrayBuffer) as any;

                if (callback)
                    callback(value);
            } break;

        case APIOpCodes.OpReqAuth:
        case APIOpCodes.OpReqCategory:
        case APIOpCodes.OpReqChannel:
        case APIOpCodes.OpReqServer:
        case APIOpCodes.OpReqServerList:
        case APIOpCodes.OpReqUser:
            break;

        default:
            console.error("Unknown OP Code!", opMsg.Op);
            break;
        }

        delete this.callbacks[opMsg.Cb.toString()]; // Cleanup afterwards
    }

    private async cacheUser(user: number, override?: boolean) {
        if (this.cached_users[user] && !override)
            return this.cached_users[user]; // Don't recache user if already exists

        const u = await this.ReqUser<any>(user);
        return this.cached_users[u.ID.toString()] = {
            Id: u.ID,
            Identifier: u.Identifier,
            Name: u.Name,
            Status: u.Status
        } as IUser;
    }

    public async UpdateServerList() {
        const server_list: IServer[] = [];
        const srvList = await this.ReqServerList<number[]>();
        for (const serverId of srvList) {
            const server = await this.ReqServer<any>(serverId);

            const tmpServer = {
                Id: server.ID,
                Name: server.Name,
                Logo: {} as IImage,
                Users: [],
                Categories: []
            } as IServer;

            for (const userId of server.Users) {
                tmpServer.Users.push(await this.cacheUser(userId));
            }

            for (const categoryId of server.Categories) {
                const category = await this.ReqCategory<any>(categoryId);

                const tmpCategory = {
                    Id: category.ID,
                    Name: category.Name,
                    SubChannels: []
                } as ICategory;

                for (const channelId of category.Channels) {
                    const channel = await this.ReqChannel<any>(channelId);

                    const tmpChannel = {
                        Id: channel.ID,
                        Name: channel.Name,
                        Topic: channel.Topic,
                        MessageCount: channel.MessageCount,
                        MessagesRead: channel.MessagesRead,
                        MessageHistory: [],
                        VoiceConnectedUsers: []
                    } as IChannel;

                    for (const msg of channel.MessageHistory) {
                        tmpChannel.MessageHistory.push({
                            Id: msg.ID,
                            Message: msg.Message,
                            Timestamp: msg.Timestamp,
                            User: await this.cacheUser(msg.User)
                        });
                    }

                    for (const userId of channel.VoiceConnectedUsers) {
                        tmpChannel.VoiceConnectedUsers.push(await this.cacheUser(userId));
                    }

                    tmpCategory.SubChannels.push(tmpChannel);
                }

                tmpServer.Categories.push(tmpCategory);
            }

            server_list.push(tmpServer);
        }

        SiteStateStore.dispatch({ type: ServerActions.UPDATE, ServerList: server_list } as IServerAction);
        if (server_list.length > 0)
            SiteStateStore.dispatch(SetActive(server_list[0]));
    }

    private callbackId() {
        return this._last_callback++;
    }
    
    private Hello<T>() {
        return new Promise<T>(resolve =>  {
            const cbId = this.callbackId();

            this.Send(APIOpCodes.OpHello, cbId, resolve);
        });
    }

    private ReqAuth<T>() {
        return new Promise<T>(resolve =>  {
            const cbId = this.callbackId();

            this.Send(APIOpCodes.OpReqAuth, cbId, resolve);
        });
    }
    
    private ReqServerList<T>() {
        return new Promise<T>(resolve =>  {
            const cbId = this.callbackId();

            this.Send(APIOpCodes.OpReqServerList, cbId, resolve);
        });
    }

    private ReqUser<T>(id: number) {
        return new Promise<T>(resolve =>  {
            const cbId = this.callbackId();

            this.Send(APIOpCodes.OpReqUser, cbId, resolve, id);
        });
    }

    private ReqServer<T>(id: number) {
        return new Promise<T>(resolve =>  {
            const cbId = this.callbackId();

            this.Send(APIOpCodes.OpReqServer, cbId, resolve, id);
        });
    }

    private ReqCategory<T>(id: number) {
        return new Promise<T>(resolve =>  {
            const cbId = this.callbackId();

            this.Send(APIOpCodes.OpReqCategory, cbId, resolve, id);
        });
    }

    private ReqChannel<T>(id: number) {
        return new Promise<T>(resolve =>  {
            const cbId = this.callbackId();

            this.Send(APIOpCodes.OpReqChannel, cbId, resolve, id);
        });
    }
}

export const Client = new APIClient();

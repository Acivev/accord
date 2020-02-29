import React from "react";

import "./User.scss";
import Avatar from "../../../Shared/Avatar/Avatar";
import { IUser, UserStatus } from "../../../../../API/v1/User";

export interface UserProps extends React.Props<UserProps> {
    User: IUser
}

// TODO: Maybe in the future, we gotta move this Component onto the Components/Shared folder as it could be used for Friends List.
// No idea if i should add one though, requires further feedback!
function User(props: UserProps) {
    return (
        <div id="User" >
            <Avatar className="avatar" User={props.User} />

            <div className="identity">
                <span className="name">{props.User.Name} <span className="identifier">#{props.User.Identifier}</span></span>
                
            </div>

            <span className="status">{UserStatus[props.User.Status]}</span>
        </div>
    );
}

export default User;

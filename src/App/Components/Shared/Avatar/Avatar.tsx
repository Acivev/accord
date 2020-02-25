import React from "react";

import "./Avatar.scss";

import DefaultAvatar from "./Default.svg";
import { IUser, UserStatus } from './../../../../API/v1/User';

export interface AvatarProps extends React.Props<AvatarProps> {
    className?: string,
    User: IUser
}

function Avatar(props: AvatarProps) {
    return (
        <div id="Avatar" className={props.className} >
            <img src={DefaultAvatar} className="image" alt="" />
            <div className="status" data-tip data-for={"tooltip-status-" + UserStatus[props.User.Status].toLowerCase()} />
        </div>
    );
}

export default Avatar;

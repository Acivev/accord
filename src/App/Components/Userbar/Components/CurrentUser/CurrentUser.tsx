import React from "react";

import "./CurrentUser.scss";
import { connect } from "react-redux";
import User from "../User/User";
import { Settings } from '@material-ui/icons';

function CurrentUser(props: any) {
    const localUser = props.LocalUser;

    return (
        <div id="CurrentUser">
            <User User={localUser} />

            <div className="settingBtn">
                <Settings />
            </div>
           
        </div>
    );
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(CurrentUser);


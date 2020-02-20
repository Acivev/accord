import React from 'react';
import { connect } from 'react-redux';

import './Chatbar.scss'
import ServerImage from './Components/ServerImage/ServerImage';
import { IServer } from '../../../API/v1/Server';
import Category from './Components/Category/Category';

function Chatbar(props: any) {
    if (!props.ActiveServer)
        return <div />

    const activeServer: IServer = props.ActiveServer;

    const categoryList = [];

    for (const category of activeServer.Categories) {
        categoryList.push(<Category key={category.Id} {...{Category: category}} />);
    }

    return (
        <div id="Chatbar">
            <ServerImage />
            
            { categoryList }

        </div>
    )
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Chatbar);

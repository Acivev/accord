import React from "react";
import { connect } from "react-redux";

import "./Category.scss";
import { ICategory } from "./../../../../../API/v1/Servers/Chat";
import Channel from "./Components/Channel/Channel";
import { SiteStateStore } from "./../../../../../Shared/Globals";
import { ShowCategory, HideCategory } from "../../../../../Shared/Actions/ServerActions";

function Category(props: any) {
    const category: ICategory = props.Category;
    const hiddenCategories: ICategory[] = props.HiddenCategories;

    const channelList = [];

    for (const channel of category.SubChannels) {
        channelList.push(<Channel key={channel.Id} Channel={channel} />);
    }

    let shouldHide = hiddenCategories.includes(category);

    return (
        <div id="Category" className={shouldHide ? "hidden" : ""}>
            <span className="category name" onClick={e => {
                if (shouldHide){
                    SiteStateStore.dispatch(ShowCategory(category));
                } else {
                    SiteStateStore.dispatch(HideCategory(category));
                }
            }}>
                <svg viewBox="0 0 5.5 6" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={e => (e.target as any).parentElement.parentElement.classList.toggle("hidden")}>
                    <path d="M4.44263 0.937928L2.32684 5.29834L0.211046 0.937928H4.44263Z" fill="#838383"/>
                </svg>
                { category.Name.toUpperCase() }
            </span>
            <div className="SubChannels">
                { channelList }
            </div>
        </div>
    );
}

export default connect(
    (state: any) => (state.ServerActionReducer),
)(Category);

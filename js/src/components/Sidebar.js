import React from "react";
import SidebarTags from "./SidebarTags";
import SidebarCorrespondents from "./SidebarCorrespondents";

class Sidebar extends React.Component {
    // RENDER
    render() {
        return (
            <div className="pane pane-sm sidebar">
                <SidebarCorrespondents
                    setCorrespondentFilter={this.props.setCorrespondentFilter}
                />
                <SidebarTags setTagFilter={this.props.setTagFilter} />
            </div>
        );
    }
}

export default Sidebar;

import React from "react";
import PaperlessComponent from "./PaperlessComponent";
import { RIEInput } from "riek";

class CorrespondentsListItem extends PaperlessComponent {
    // CHANGE SELECTION
    changeSelection(event) {
        const target = event.target;
        this.props.changeSelection(this.props.correspondent.id, target.checked);
    }

    // CHANGE PROP
    changeProp(e) {
        var data = Object.assign(this.props.correspondent, e);
        this.props.updateCorrespondent(data);
    }

    // RENDER
    render() {
        return (
            <tr>
                <td>
                    <input
                        type="checkbox"
                        onChange={this.changeSelection.bind(this)}
                    />
                </td>
                <td>
                    <RIEInput
                        value={this.props.correspondent.name}
                        propName="name"
                        change={this.changeProp.bind(this)}
                        classEditing="inplace-edit"
                    />
                </td>
                <td>{this.props.correspondent.match}</td>
                <td>{this.props.correspondent.matching_algorithm}</td>
            </tr>
        );
    }
}

export default CorrespondentsListItem;

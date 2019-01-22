import React from "react";
import PaperlessComponent from "./PaperlessComponent";
import { RIEInput, RIESelect } from "riek";

class TagsListItem extends PaperlessComponent {
    // CONSTRUCTOR
    constructor(props) {
        super(props);

        // matching algorithm options
        this.matching_algorithm = [
            { id: "1", text: "Any" },
            { id: "2", text: "All" },
            { id: "3", text: "Literal" },
            { id: "4", text: "Regular Expression" },
            { id: "5", text: "Fuzzy Match" }
        ];
    }

    // CHANGE SELECTION
    changeSelection(event) {
        const target = event.target;
        this.props.changeSelection(this.props.tag.id, target.checked);
    }

    // CHANGE PROP
    changeProp(e) {
        // special select box arrangement
        if ("matching_algorithm" in e) {
            e["matching_algorithm"] = parseInt(e["matching_algorithm"].id);
        }

        var data = Object.assign(this.props.tag, e);
        this.props.updateTag(data);
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
                    <span
                        className="icon icon-record"
                        style={{
                            color: super.getTagColor(this.props.tag.colour)
                        }}
                    />
                </td>
                <td>
                    <RIEInput
                        value={this.props.tag.name}
                        propName="name"
                        change={this.changeProp.bind(this)}
                        classEditing="inplace-edit"
                    />
                </td>
                <td>
                    <RIEInput
                        value={this.props.tag.match}
                        propName="match"
                        change={this.changeProp.bind(this)}
                        classEditing="inplace-edit"
                        className="tags-match"
                    />
                </td>
                <td>
                    <RIESelect
                        value={this.matching_algorithm.find(a => {
                            return parseInt(a.id) ===
                                this.props.tag.matching_algorithm;
                        })}
                        propName="matching_algorithm"
                        change={this.changeProp.bind(this)}
                        options={this.matching_algorithm}
                    />
                </td>
            </tr>
        );
    }
}

export default TagsListItem;

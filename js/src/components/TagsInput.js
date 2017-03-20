import React from "react";
import TagsActions from "../actions/TagsActions";
import TagsStore from "../stores/TagsStore";
import Select from "react-select";

class TagsInput extends React.Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);

        this.state = TagsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    // COMPONENT DID MOUNT
    componentDidMount() {
        if (this.props.tags) {
            // extract the tags selection
            this.setState({
                selection: this.props.tags.map(t => {
                    var s = t.replace(/\/$/, "").split("/");
                    return parseInt(s[s.length - 1]);
                })
            });

            console.log("set selection");
        }

        TagsStore.listen(this.onChange);
        TagsActions.getTags();
    }

    // COMPONENT WILL UNMOUNT
    componentWillUnmount() {
        TagsStore.unlisten(this.onChange);
    }

    // ON CHANGE
    onChange(state) {
        this.setState(state);
    }

    // CHANGE SELECTION
    changeSelection(val) {
        this.setState({
            selection: val
        });

        // prepare the paperless API value for the tags
        var updateTags = val.map(v => {
            return localStorage.getItem("settings.host") +
                "/tags/" +
                v.value +
                "/";
        });

        console.log(updateTags);

        this.props.onChange({
            target: {
                name: "tags",
                value: updateTags
            }
        });
    }

    // RENDER
    render() {
        var possibles = [];

        // prepare the selection tag ids
        if (this.state.tags && this.state.tags.count > 0) {
            // possible tags
            possibles = this.state.tags.results.map(t => {
                return {
                    label: t.name,
                    value: t.id
                };
            });
        }

        return (
            <Select
                name="tags"
                value={this.state.selection}
                options={possibles}
                onChange={this.changeSelection.bind(this)}
                multi={true}
            />
        );
    }
}

export default TagsInput;

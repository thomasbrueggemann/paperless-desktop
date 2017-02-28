import React from "react";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import CorrespondentsStore from "../stores/CorrespondentsStore";

class CorrespondentSelect extends React.Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);

        this.state = CorrespondentsStore.getState();
        CorrespondentsStore.setRouter(this.context.router);
        this.onChange = this.onChange.bind(this);
    }

    // COMPONENT DID MOUNT
    componentDidMount() {
        CorrespondentsStore.listen(this.onChange);
        CorrespondentsActions.getCorrespondents();
    }

    // COMPONENT WILL UNMOUNT
    componentWillUnmount() {
        CorrespondentsStore.unlisten(this.onChange);
    }

    // ON CHANGE
    onChange(state) {
        this.setState(state);
    }

    // RENDER
    render() {
        return (
            <select
                className="form-control"
                defaultValue={this.props.value}
                name="correspondent"
                onChange={this.props.onChange}>

                <option />
                {this.state.correspondents.results.map(c => {
                    var value = localStorage.getItem("settings.host") +
                        "/api/correspondents/" +
                        c.id +
                        "/";
                    return <option key={c.id} value={value}>{c.name}</option>;
                })}
            </select>
        );
    }
}

// CONTEXT TYPES
CorrespondentSelect.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default CorrespondentSelect;

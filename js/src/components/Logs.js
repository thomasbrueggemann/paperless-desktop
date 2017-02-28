import React from "react";
import LogsActions from "../actions/LogsActions";
import LogsStore from "../stores/LogsStore";
import moment from "moment";
import $ from "jquery";

class Logs extends React.Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = LogsStore.getState();
        LogsStore.setRouter(this.context.router);
        this.onChange = this.onChange.bind(this);
    }

    // COMPONENT DID MOUNT
    componentDidMount() {
        $(window).trigger("tabs.replace", {
            idx: 0,
            tab: {
                title: "Logs",
                route: "/logs"
            }
        });
        $(window).trigger("header.activeItem", { item: "logs" });

        LogsStore.listen(this.onChange);
        LogsActions.getLogs();
    }

    // COMPONENT WILL UNMOUNT
    componentWillUnmount() {
        LogsStore.unlisten(this.onChange);
    }

    // ON CHANGE
    onChange(state) {
        this.setState(state);
    }

    // RENDER
    render() {
        if (!this.state.logs || !("results" in this.state.logs)) return null;

        return (
            <div className="pane">
                <table className="table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Log</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.logs.results.map(l => {
                            return (
                                <tr key={l.time}>
                                    <td>{moment(l.time).format("LLLL")}</td>
                                    <td>{l.messages}</td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        );
    }
}

// CONTEXT TYPES
Logs.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Logs;

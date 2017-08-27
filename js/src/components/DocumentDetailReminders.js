import React from "react";
import RemindersActions from "../actions/RemindersActions";
import RemindersStore from "../stores/RemindersStore";
import moment from "moment";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

class DocumentDetailReminders extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = RemindersStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		RemindersStore.listen(this.onChange);
		RemindersActions.getReminders();

		// EVENT: tagAdded
		ipcRenderer.on("reminderAdded", (e, data) => {
			// add the newly created tag to the store
			var reminders = this.state.reminders;
			if (reminders) {
				reminders.push(data);

				this.setState({
					reminders: reminders
				});
			}
		});
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		RemindersStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {
		// filter out the matching reminders
		var reminders = this.state.reminders.filter(r => {
			return r.document.endsWith("/" + this.props.doc.id + "/");
		});

		// display that no reminders are available
		var content = <span className="no-reminders">no reminders yet</span>;

		// if there are reminders available, show them
		if (reminders.length > 0) {
			var reminderTRs = reminders.map((r, idx) => {
				return (
					<tr key={"reminders_" + idx}>
						<td>
							{moment(r.date).format("llll")}
						</td>
						<td>
							{r.note}
						</td>
						<td>
							<button
								className="btn btn-mini btn-negative"
								title="Remove reminder"
							>
								Remove
							</button>
						</td>
					</tr>
				);
			});

			content = (
				<table className="table-striped">
					<thead>
						<tr>
							<th>Date</th>
							<th>Note</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{reminderTRs}
					</tbody>
				</table>
			);
		}

		return (
			<div>
				{content}
			</div>
		);
	}
}

export default DocumentDetailReminders;

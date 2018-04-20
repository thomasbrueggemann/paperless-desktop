import React from "react";
import PaperlessComponent from "../components/PaperlessComponent";
import RemindersActions from "../actions/RemindersActions";
import RemindersStore from "../stores/RemindersStore";
import moment from "moment";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const dialog = remote.dialog;

class RemindersAdd extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props, context) {
		super(props, context);

		this.state = {
			doc: context.router.params.doc,
			date: null,
			note: null
		};
	}

	// CLOSE MODAL
	closeModal() {
		ipcRenderer.send("closeModal");
	}

	// SAVE REMINDER
	saveReminder(e) {
		e.preventDefault();

		var date = moment(this.state.date)
			.utc()
			.toISOString();

		// check if reminder is in the future
		if (
			moment(this.state.date)
				.utc()
				.isBefore(moment.utc())
		) {
			return dialog.showErrorBox(
				"Time travel as not been invented yet.... or has it?",
				"Select a reminder date in the future!"
			);
		}

		// check if a note is available
		if (this.state.note === null || this.state.note.trim().length <= 0) {
			return dialog.showErrorBox("Could not add reminder", "Please add a note text!");
		}

		RemindersActions.addReminder(this.state.doc, date, this.state.note);
	}

	// HANDLE CHANGE
	handleChange(e) {
		var s = this.state;
		s[e.target.name] = e.target.value;

		this.setState(s);
	}

	// RENDER
	render() {
		return (
			<form className="form-detail-info">
				<h3>Add Reminder</h3>
				<div className="form-group">
					<label>Date</label>
					<input
						type="datetime-local"
						className="form-control"
						name="date"
						onChange={this.handleChange.bind(this)}
						placeholder="Reminder"
					/>
				</div>
				<div className="form-group">
					<label>Note</label>
					<textarea
						className="form-control"
						rows="2"
						name="note"
						onChange={this.handleChange.bind(this)}
						placeholder="Add a note to your reminder, if you'd like."
					/>
				</div>

				<p style={{ color: "grey" }}>
					Note: reminder notifications only show up, while this app is open on your Mac!
				</p>

				<div className="btn-group">
					<button
						className="btn btn-large btn-default"
						onClick={this.closeModal.bind(this)}
					>
						Close
					</button>
					<button
						className="btn btn-large btn-primary"
						onClick={this.saveReminder.bind(this)}
					>
						<span className="icon icon-floppy" /> Save
					</button>
				</div>
			</form>
		);
	}
}

// CONTEXT TYPES
RemindersAdd.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default RemindersAdd;

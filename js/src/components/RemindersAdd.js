import React from "react";
import PaperlessComponent from "./PaperlessComponent";
import RemindersActions from "../actions/RemindersActions";
import RemindersStore from "../stores/RemindersStore";
import moment from "moment";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

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

		var date = moment(this.state.date).utc().toISOString();
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

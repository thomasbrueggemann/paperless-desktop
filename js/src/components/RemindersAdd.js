import React from "react";
import PaperlessComponent from "./PaperlessComponent";
import slug from "slug";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

class RemindersAdd extends PaperlessComponent {

	// CLOSE MODAL
	closeModal() {
		ipcRenderer.send("closeModal");
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
                        placeholder="Reminder"
                    />
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea
                        className="form-control"
                        rows="2"
                        name="description"
                        placeholder="Description"
                    />
				</div>

				<div className="btn-group">
                    <button
                        className="btn btn-large btn-default"
                        onClick={this.closeModal.bind(this)}>
                        Close
                    </button>
                    <button
                        className="btn btn-large btn-primary">
                        <span className="icon icon-floppy" /> Save
                    </button>
                </div>
			</form>
		);
	}

}

export default RemindersAdd;

import React from "react";
import PaperlessComponent from "./PaperlessComponent";
import slug from "slug"


// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer  = electron.ipcRenderer;

class CorrespondentsAdd extends PaperlessComponent {

	constructor(props) {
		super(props);

		this.state = {
			"name": "",
			"slug": ""
		}
	}

	// CLOSE MODAL
	closeModal() {
		ipcRenderer.send("closeModal");
	}

	// HANDLE CHANGE
	handleChange(e) {

		var s = this.state;
		s[e.target.name] = e.target.value;

		if(e.target.name === "name") {
			s["slug"] = slug(e.target.value);
		}

		this.setState(s);
	}

	// RENDER
	render() {

		return (
			<form className="form-detail-info">
				<h3>Add Correspondent</h3>
				<div className="form-group">
					<label>Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						placeholder="Name"
						value={this.state.name}
						onChange={this.handleChange.bind(this)}
					/>
				</div>

				<div className="form-group">
					<label>Slug</label>
					<input
						type="text"
						className="form-control"
						name="slug"
						placeholder="Slug"
						value={this.state.slug}
						onChange={this.handleChange.bind(this)}
					/>
				</div>

				<div className="btn-group">
					<button className="btn btn-large btn-default" onClick={this.closeModal.bind(this)}>Close</button>
					<button className="btn btn-large btn-primary">
						<span className="icon icon-floppy"></span> Save
					</button>
				</div>
			</form>
		);
	}
}

export default CorrespondentsAdd;

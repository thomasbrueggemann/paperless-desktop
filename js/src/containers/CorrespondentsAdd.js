import React from "react";
import PaperlessComponent from "../components/PaperlessComponent";
import CorrespondentsActions from "../actions/CorrespondentsActions";
import slug from "slug";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

class CorrespondentsAdd extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);

		this.nameInput = null;
		this.state = {
			name: "",
			slug: ""
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		this.nameInput.focus();
	}

	// CLOSE MODAL
	closeModal() {
		ipcRenderer.send("closeModal");
	}

	// HANDLE CHANGE
	handleChange(e) {
		var s = this.state;
		s[e.target.name] = e.target.value;

		if (e.target.name === "name") {
			s["slug"] = slug(e.target.value).toLowerCase();
		}

		this.setState(s);
	}

	// SAVE CORRESPONDENT
	saveCorrespondent(e) {
		e.preventDefault();
		CorrespondentsActions.addCorrespondent(this.state);
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
						ref={(input) => {
							this.nameInput = input;
						}}
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
					<button
						className="btn btn-large btn-default"
						onClick={this.closeModal.bind(this)}
					>
						Close
					</button>
					<button
						className="btn btn-large btn-primary"
						onClick={this.saveCorrespondent.bind(this)}
					>
						<span className="icon icon-floppy" /> Save
					</button>
				</div>
			</form>
		);
	}
}

export default CorrespondentsAdd;

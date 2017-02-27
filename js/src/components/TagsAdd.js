import React from "react";
import PaperlessComponent from "./PaperlessComponent";
import slug from "slug"
import TagsActions from "../actions/TagsActions";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer  = electron.ipcRenderer;

class TagsAdd extends PaperlessComponent {

	constructor(props) {
		super(props);

		this.state = {
			"name": "",
			"slug": "",
			"colour": "",
			"match": "",
			"matching_algorithm": ""
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

	// SAVE TAG
	saveTag() {
		TagsActions.addTag(this.state);
		this.closeModal();
	}

	// RENDER
	render() {

		return (
			<form className="form-detail-info">
				<h3>Add Tag</h3>
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

				<div className="form-group">
					<label>Color</label>
					<select
						className="form-control"
						name="colour"
						onChange={this.handleChange.bind(this)}>

						{super.getColors().map(c => {
							return (<option>{c}</option>);
						})}
					</select>
				</div>

				<div className="form-group">
					<label>Match</label>
					<input
						type="text"
						className="form-control"
						name="match"
						placeholder="Match"
						value={this.state.match}
						onChange={this.handleChange.bind(this)}
					/>
				</div>

				<div className="form-group">
					<label>Matching-Algorithm</label>
					<select
						className="form-control"
						name="matching_algorithm"
						onChange={this.handleChange.bind(this)}>
						
					    <option>Any</option>
					    <option>All</option>
					    <option>Literal</option>
					    <option>Regular Expression</option>
					</select>
					<small>
						Which algorithm you want to use when matching text to the OCR'd PDF. Here, "any" looks for any occurrence of any word provided in the PDF, while "all" requires that every word provided appear in the PDF, albeit not in the order provided. A "literal" match means that the text you enter must appear in the PDF exactly as you've entered it, and "regular expression" uses a regex to match the PDF. If you don't know what a regex is, you probably don't want this option.
					</small>
				</div>

				<div className="btn-group">
					<button className="btn btn-large btn-default" onClick={this.closeModal.bind(this)}>Close</button>
					<button className="btn btn-large btn-primary" onClick={this.saveTag.bind(this)}>
						<span className="icon icon-floppy"></span> Save
					</button>
				</div>
			</form>
		);
	}
}

export default TagsAdd;

import React from "react";
import moment from "moment";
import TagsInput from "./TagsInput";
import PaperlessComponent from "./PaperlessComponent";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer  = electron.ipcRenderer;

class DocumentDetailForm extends PaperlessComponent {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"doc": this.props.doc
		};
	}

	// HANDLE DETAIL CHANGE
	handleDetailChange(e) {

		var doc = this.state.doc;
		doc[e.target.name] = e.target.value;

		this.setState({
			"doc": doc
		});
	}

	// DOWNLOAD
	download(e) {
		e.preventDefault();

		// downstream the download command
		console.log(this.state.doc);

		ipcRenderer.send("download", {
			"url": super.getHost() + this.state.doc.download_url.replace("\\", "")
		});
	}

	// SAVE
	save(e) {
		e.preventDefault();
	}

	// RENDER
	render() {

		// convert the date to local time
		var created = moment.utc(this.state.doc.created).local().format("YYYY-MM-DD[T]HH:mm");

		return (
			<form className="form-detail-info">
				<div className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" name="title" placeholder="Title" value={this.state.doc.title} onChange={this.handleDetailChange.bind(this)} />
				</div>

				<div className="form-group">
					<label>Correspondent</label>
					<input type="text" className="form-control" name="correspondent" placeholder="Correspondent" value={this.state.doc.correspondent} onChange={this.handleDetailChange.bind(this)} />
				</div>

				<div className="form-group">
					<label>Content</label>
					<textarea className="form-control" rows="6" name="content" placeholder="Content" value={this.state.doc.content} onChange={this.handleDetailChange.bind(this)} />
				</div>

				<div className="form-group">
					<label>Tags</label>
					<div className="select-wrapper">
						<TagsInput tags={this.state.doc.tags} />
					</div>
				</div>

				<div className="form-group">
					<label>Created</label>
					<input type="datetime-local" className="form-control" name="created" placeholder="Tags" value={created} onChange={this.handleDetailChange.bind(this)} />
				</div>

				<div className="form-group">
					<label>Action</label>
					<div>
						<div className="btn-group">
							<button className="btn btn-large btn-default" onClick={this.download.bind(this)}>
								<span className="icon icon-download"></span> Download
							</button>
							<button className="btn btn-large btn-primary" onClick={this.save.bind(this)}>
								<span className="icon icon-floppy"></span> Save
							</button>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default DocumentDetailForm;

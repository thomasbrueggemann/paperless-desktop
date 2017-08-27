import React from "react";
import moment from "moment";
import TagsInput from "./TagsInput";
import PaperlessComponent from "./PaperlessComponent";
import CorrespondentSelect from "./CorrespondentSelect";
import DocumentDetailReminders from "./DocumentDetailReminders";

class DocumentDetailForm extends PaperlessComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			doc: this.props.doc
		};
	}

	// HANDLE DETAIL CHANGE
	handleDetailChange(e) {
		var doc = this.state.doc;
		doc[e.target.name] = e.target.value;

		this.setState({
			doc: doc
		});

		this.props.changeDoc(doc);
	}

	// RENDER
	render() {
		// convert the date to local time
		var created = moment
			.utc(this.state.doc.created)
			.local()
			.format("YYYY-MM-DD[T]HH:mm");

		return (
			<form className="form-detail-info">
				<div className="form-group">
					<label>Title</label>
					<input
						type="text"
						className="form-control"
						name="title"
						placeholder="Title"
						value={this.state.doc.title}
						onChange={this.handleDetailChange.bind(this)}
					/>
				</div>

				<div className="form-group">
					<label>Correspondent</label>
					<CorrespondentSelect
						value={this.state.doc.correspondent}
						onChange={this.handleDetailChange.bind(this)}
					/>
				</div>

				<div className="form-group">
					<label>Content</label>
					<textarea
						className="form-control"
						rows="6"
						name="content"
						placeholder="Content"
						value={this.state.doc.content}
						onChange={this.handleDetailChange.bind(this)}
					/>
				</div>

				<div className="form-group">
					<label>Tags</label>
					<div className="select-wrapper">
						<TagsInput
							tags={this.state.doc.tags}
							onChange={this.handleDetailChange.bind(this)}
						/>
					</div>
				</div>

				<div className="form-group">
					<label>Date</label>
					<input
						type="datetime-local"
						className="form-control"
						name="created"
						placeholder="Tags"
						value={created}
						onChange={this.handleDetailChange.bind(this)}
					/>
				</div>

				<div className="form-group">
					<label>Reminders</label>
					<DocumentDetailReminders doc={this.state.doc} />
				</div>
			</form>
		);
	}
}

export default DocumentDetailForm;

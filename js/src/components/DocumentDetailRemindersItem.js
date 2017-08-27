import React, { Component } from "react";
import moment from "moment";

class DocumentDetailRemindersItem extends Component {
	// REMOVE REMINDER
	removeReminder(e) {
		e.preventDefault();
		this.props.removeReminder(this.props.reminder.id);
	}

	// RENDER
	render() {
		return (
			<tr>
				<td>
					{moment(this.props.reminder.date).format("lll")}
				</td>
				<td>
					{this.props.reminder.note}
				</td>
				<td>
					<button
						className="btn btn-mini btn-default"
						title="Remove reminder"
						onClick={this.removeReminder.bind(this)}
					>
						<span className="icon icon-trash" />
					</button>
				</td>
			</tr>
		);
	}
}

export default DocumentDetailRemindersItem;

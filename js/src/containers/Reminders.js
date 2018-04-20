import React from "react";
import RemindersActions from "../actions/RemindersActions";
import RemindersStore from "../stores/RemindersStore";
import $ from "jquery";
import PaperlessComponent from "../components/PaperlessComponent";
import ToolbarActions from "../actions/ToolbarActions";
import BigCalendar from "react-big-calendar";
import moment from "moment";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const remote = electron.remote;
const dialog = remote.dialog;
const ipcRenderer = electron.ipcRenderer;

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Reminders extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = RemindersStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).trigger("tabs.replace", {
			idx: 0,
			tab: {
				title: "Reminders",
				route: "/reminders"
			}
		});
		$(window).trigger("header.activeItem", { item: "reminders" });

		RemindersStore.listen(this.onChange);
		RemindersActions.getReminders();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		// clear toolbar to add new items
		ToolbarActions.clearItems();

		RemindersStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// RENDER
	render() {
		if (!this.state.reminders) return null;

		return (
			<BigCalendar
				events={this.state.reminders.map((r) => {
					return {
						start: moment(r.date).toDate(),
						end: moment(r.date)
							.add(15, "minutes")
							.toDate(),
						title: r.note,
						desc: r.note
					};
				})}
			/>
		);
	}
}

export default Reminders;

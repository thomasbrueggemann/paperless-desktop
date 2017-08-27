import alt from "../alt";
import axios from "axios";
import async from "async";

// REMINDERS ACTIONS
class RemindersActions {
	constructor() {
		this.generateActions(
			"getRemindersSuccess",
			"getRemindersFail",
			"addReminderSuccess",
			"addReminderFail"
		);
	}

	// ADD REMINDER
	addReminder(id, date, note) {
		axios({
			method: "post",
			url: localStorage.getItem("settings.host") + "/api/reminders/",
			auth: {
				username: localStorage.getItem("settings.auth.username"),
				password: localStorage.getItem("settings.auth.password")
			},
			data: {
				document:
					localStorage.getItem("settings.host") +
					"/api/documents/" +
					id +
					"/",
				date: date,
				note: note
			}
		})
			.then(this.actions.addReminderSuccess)
			.catch(this.actions.addReminderFail);
	}

	// GET REMINDERS
	getReminders() {
		var next = null;
		var reminders = [];
		var url = localStorage.getItem("settings.host") + "/api/reminders/";

		async.doWhilst(
			done => {
				axios({
					method: "get",
					url: next || url,
					auth: {
						username: localStorage.getItem(
							"settings.auth.username"
						),
						password: localStorage.getItem("settings.auth.password")
					}
				})
					.then(result => {
						// add results to global array
						result.data.results.forEach(elem => {
							reminders.push(elem);
						});

						next = result.data.next;

						return done(null);
					})
					.catch(done);
			},
			() => {
				return !!next;
			},
			err => {
				if (err) this.actions.getRemindersFail(err);
				else this.actions.getRemindersSuccess(reminders);
			}
		);
	}
}

export default alt.createActions(RemindersActions);

import React from "react";
import $ from "jquery";
import TabItem from "./TabItem";

// IPC hack (https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c#.gi5l2hzbq)
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer  = electron.ipcRenderer;

class Tabs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"tabs": []
		}
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$(window).on("tabs.push", this.pushTab.bind(this));
		$(window).on("tabs.replace", this.replaceTab.bind(this));
		$(window).on("hashchange", this.routeChanged.bind(this));
		$(window).on("tabs.closeCurrent", this.closeCurrent.bind(this));

		// close Tab event
		ipcRenderer.on("closeCurrentTab", this.closeCurrent.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("tabs.push");
		$(window).off("tabs.replace");
		$(window).off("tabs.closeCurrent");
		$(window).off("hashchange");
	}

	// ROUTE CHANGED
	routeChanged() {

		var route = location.hash.replace("#", "").split("?")[0];
		this.setActive(route);
	}

	// CLOSE CURRENT
	closeCurrent() {
		if(this.state.tabs.length > 1) {

			// find current route
			var currTabRoute = this.state.tabs.find(tab => {
				return tab.active === true;
			});

			// remove the current tab
			this.removeTab(currTabRoute.route);
		}
	}

	// PUSH TAB
	pushTab(e, data) {
		var tabs = this.state.tabs;

		// check if tab is not existant yet, based
		// on the route property
		var exists = false;
		for(var i in tabs) {
			if(tabs[i].route === data.route) {
				exists = true;
				break;
			}
		}

		if(!exists) {

			tabs.push(data);
			this.setState({
				"tabs": tabs
			});

			// set the pushed tab as active
			this.setActive(data.route);
		}
	}

	// REPLACE TAB
	replaceTab(e, data) {
		var tabs = this.state.tabs;

		// nothing to replace, push the tab on the tabs stack
		if((tabs.length - 1) < data.idx) {
			this.pushTab(e, data);
		}

		// replace the tab content
		tabs[data.idx] = data.tab;
		this.setState({
			"tabs": tabs
		});
	}

	// SET ACTICE
	setActive(route) {

		// only set the tab with the parameter route to active
		var tabs = this.state.tabs;
		for(var i in tabs) {
			if(tabs[i].route === route) {
				tabs[i].active = true;
			}
			else {
				tabs[i].active = false;
			}
		}

		this.setState({
			"tabs": tabs
		});
	}

	// REMOVE TAB
	removeTab(route) {

		var tabs = this.state.tabs;
		var newTabs = [];
		var idxRemoved = null;

		for(var i in tabs) {
			if(tabs[i].route != route) {
				newTabs.push(tabs[i]);
			}
			else {
				// store the index that was removed, to
				// determine the i - 1 next active tab
				idxRemoved = i;
			}
		}

		this.setState({
			"tabs": newTabs
		});

		if(idxRemoved !== null) {
			var newActiveIdx = Math.max(0, idxRemoved - 1);

			var r = newTabs[newActiveIdx].route;
			this.props.history.replace(r);
		}

		// set first tab as active
		//this.setActive(newTabs[0].route);
	}

	// RENDER
	render() {

		if(this.state.tabs.length <= 1) return null;
		var i = 0;

		return (
			<div className="tab-group">
				{this.state.tabs.map(t => {

					i++;
					return (<TabItem tab={t} idx={i} key={i} removeTab={this.removeTab.bind(this)} />);
				})}
			</div>
		);
	}
}

export default Tabs;

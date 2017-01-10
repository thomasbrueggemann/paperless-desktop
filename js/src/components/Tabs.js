import React from "react";
import $ from "jquery";
import TabItem from "./TabItem";

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
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$(window).off("tabs.push");
		$(window).off("tabs.replace");
	}

	// ROUTE CHANGED
	routeChanged() {
		var route = location.hash.replace("#", "").split("?")[0];
		console.log(route);
		this.setActive(route);
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
		for(var i in tabs) {
			if(tabs[i].route !== route) {
				newTabs.push(tabs[i]);
			}
		}

		this.setState({
			"tabs": newTabs
		});
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

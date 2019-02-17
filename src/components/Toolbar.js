import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Columns, Column, Tabs, TabList, Tab } from "bloomer";

import Search from "./Search";
import ToolbarContext from "../contexts/ToolbarContext";

import "../styles/toolbar.scss";

export default function Toolbar() {
	const toolbarContext = useContext(ToolbarContext.Context);

	return (
		<section id="toolbar">
			<Columns>
				<Column>
					<Tabs
						isToggle
						isPulled="left"
						isSize="small"
						className="is-toggle-rounded tabs-main-menu"
					>
						<TabList>
							<Tab isActive={toolbarContext.state.active === "documents"}>
								<Link to="/documents" title="Documents">
									<span className="icon is-small">
										<i className="fas fa-folder-open" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "correspondents"}>
								<Link to="/correspondents" title="Correspondents">
									<span className="icon is-small">
										<i className="fas fa-users" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "tags"}>
								<Link to="/tags" title="Tags">
									<span className="icon is-small">
										<i className="fas fa-tag" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "reminders"}>
								<Link to="/reminders" title="Reminders">
									<span className="icon is-small">
										<i className="fas fa-bell" />
									</span>
								</Link>
							</Tab>
						</TabList>
					</Tabs>
					<Tabs
						isToggle
						isPulled="left"
						isSize="small"
						className="is-toggle-rounded tabs-main-menu"
					>
						<TabList>
							<Tab isActive={toolbarContext.state.active === "settings"}>
								<Link to="/settings" title="Settings">
									<span className="icon is-small">
										<i className="fas fa-cogs" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "logs"}>
								<Link to="/logs" title="Logs">
									<span className="icon is-small">
										<i className="fas fa-align-justify" />
									</span>
								</Link>
							</Tab>
						</TabList>
					</Tabs>
				</Column>
				<Column className="is-one-quarter">
					<Switch>
						<Route path="/documents">
							<Search />
						</Route>
					</Switch>
				</Column>
			</Columns>
		</section>
	);
}

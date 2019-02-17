import React, { useContext, useEffect } from "react";
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
								<Link to="/documents">
									<span className="icon is-small">
										<i className="fas fa-file" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "correspondents"}>
								<Link to="/correspondents">
									<span className="icon is-small">
										<i className="fas fa-users" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "tags"}>
								<Link to="/tags">
									<span className="icon is-small">
										<i className="fas fa-tag" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "reminders"}>
								<Link to="/reminders">
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
								<Link to="/settings">
									<span className="icon is-small">
										<i className="fas fa-cogs" />
									</span>
								</Link>
							</Tab>
							<Tab isActive={toolbarContext.state.active === "logs"}>
								<Link to="/logs">
									<span className="icon is-small">
										<i className="fas fa-align-justify" />
									</span>
								</Link>
							</Tab>
						</TabList>
					</Tabs>
				</Column>
				<Column className="is-one-quarter">
					<Search />
				</Column>
			</Columns>
		</section>
	);
}

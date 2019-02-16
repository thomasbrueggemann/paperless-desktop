import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Columns, Column, Tabs, TabList, TabLink, Tab } from "bloomer";

import Search from "./Search";

import "../styles/toolbar.scss";

export default function Toolbar() {
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
							<Tab isActive>
								<TabLink>
									<span className="icon is-small">
										<i className="fas fa-file" />
									</span>
								</TabLink>
							</Tab>
							<Tab>
								<TabLink>
									<span className="icon is-small">
										<i className="fas fa-users" />
									</span>
								</TabLink>
							</Tab>
							<Tab>
								<TabLink>
									<span className="icon is-small">
										<i className="fas fa-tag" />
									</span>
								</TabLink>
							</Tab>
							<Tab>
								<TabLink>
									<span className="icon is-small">
										<i className="fas fa-bell" />
									</span>
								</TabLink>
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
							<Tab>
								<TabLink>
									<span className="icon is-small">
										<i className="fas fa-cogs" />
									</span>
								</TabLink>
							</Tab>
							<Tab>
								<TabLink>
									<span className="icon is-small">
										<i className="fas fa-align-justify" />
									</span>
								</TabLink>
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

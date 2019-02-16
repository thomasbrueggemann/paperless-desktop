import React, { useContext, useEffect } from "react";
import { Menu, MenuLabel, MenuList, MenuLink, Tag } from "bloomer";

export default function Search() {
	return (
		<Menu>
			<MenuLabel>Correspondents</MenuLabel>
			<MenuList>
				<li>
					<MenuLink>
						<i className="fas fa-user" /> Sparkasse Krefeld
					</MenuLink>
				</li>
				<li>
					<MenuLink>
						<i className="fas fa-user" /> LVM Versicherungen
					</MenuLink>
				</li>
			</MenuList>
			<MenuLabel>Tags</MenuLabel>
			<MenuList>
				<li>
					<MenuLink>
						<Tag isColor="primary">Primary</Tag>
					</MenuLink>
				</li>
				<li>
					<MenuLink>
						<Tag isColor="info">Info</Tag>
					</MenuLink>
				</li>
				<li>
					<MenuLink>
						<Tag isColor="danger">Danger</Tag>
					</MenuLink>
				</li>
			</MenuList>
		</Menu>
	);
}

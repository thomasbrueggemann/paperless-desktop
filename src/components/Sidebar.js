import React, { useContext, useEffect } from "react";
import { Menu, MenuLabel, MenuList, MenuLink, Tag } from "bloomer";

import SidebarTags from "./SidebarTags";
import TagsContext from "../contexts/TagsContext";
import CorrespondentsContext from "../contexts/CorrespondentsContext";
import SidebarCorrespondents from "./SidebarCorrespondents";

export default function Sidebar() {
	return (
		<Menu>
			<MenuLabel>Correspondents</MenuLabel>
			<MenuList>
				<CorrespondentsContext.ContextProvider>
					<SidebarCorrespondents />
				</CorrespondentsContext.ContextProvider>
			</MenuList>
			<MenuLabel>Tags</MenuLabel>
			<MenuList>
				<TagsContext.ContextProvider>
					<SidebarTags />
				</TagsContext.ContextProvider>
			</MenuList>
		</Menu>
	);
}

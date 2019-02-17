import React, { useContext, useEffect } from "react";
import { Field, Label, Control, Input, Section, Select, TextArea, Button } from "bloomer";

export default function DocumentEditSidebar() {
	return (
		<div className="sidebar-container">
			<Field>
				<Label>Title</Label>
				<Control>
					<Input type="text" placeholder="Title" />
				</Control>
			</Field>

			<Field>
				<Label>Correspondent</Label>
				<Control>
					<Select>
						<option>Option 1</option>
						<option>Option 2</option>
					</Select>
				</Control>
			</Field>

			<Field>
				<Label>Content</Label>
				<Control>
					<TextArea placeholder={"<TextArea />"} />
				</Control>
			</Field>

			<Field>
				<Label>Tag</Label>
				<Control>
					<Select>
						<option>Option 1</option>
						<option>Option 2</option>
					</Select>
				</Control>
			</Field>

			<Field>
				<Label>Date</Label>
				<Control>
					<Input type="datetime-local" placeholder="Title" />
				</Control>
			</Field>

			<Field>
				<Label>Reminders</Label>
				<Control>no reminders set</Control>
			</Field>

			<Field>
				<Control>
					<Button isFullWidth>Add Reminder</Button>
				</Control>
			</Field>

			<Field>
				<Control>
					<Button isColor="danger" isFullWidth>
						Delete document
					</Button>
				</Control>
			</Field>
		</div>
	);
}

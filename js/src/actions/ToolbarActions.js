import alt from "../alt";

// TOOLBAR ACTIONS
class ToolbarActions {

    constructor() {
        this.generateActions(
            "addItemSuccess",
			"clearItemsSuccess"
        );
    }

	// CLEAR ITEMS
	clearItems() {
		this.actions.clearItemsSuccess();
	}

    // ADD ITEM
    addItem(icon, text, flavor, position, click) {

		// add a new item
		this.actions.addItemSuccess({
			"icon": icon,
			"text": text,
			"flavor": flavor,
			"position": position,
			"click": click
		});
    }
}

export default alt.createActions(ToolbarActions);

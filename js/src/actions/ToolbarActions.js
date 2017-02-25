import alt from "../alt";

// TOOLBAR ACTIONS
class ToolbarActions {

    constructor() {
        this.generateActions(
            "addItemSuccess",
			"clearItemsSuccess",
			"removeItemSuccess"
        );
    }

	// CLEAR ITEMS
	clearItems() {
		this.actions.clearItemsSuccess();
	}

    // ADD ITEM
    addItem(id, icon, text, flavor, position, click) {

		// add a new item
		this.actions.addItemSuccess({
			"id": id,
			"icon": icon,
			"text": text,
			"flavor": flavor,
			"position": position,
			"click": click
		});
    }

	// REMOVE ITEM
	removeItem(id) {

		// remove an item from toolbar
		this.actions.removeItemSuccess({
			"id": id
		});
	}
}

export default alt.createActions(ToolbarActions);

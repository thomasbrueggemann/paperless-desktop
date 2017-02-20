import alt from "../alt";
import ToolbarActions from "../actions/ToolbarActions";

// TOOLBAR STORE
class ToolbarStore {

	constructor() {
		this.bindActions(ToolbarActions);
		this.items = [];
	}

	// ADD ITEM SUCCESS
  	addItemSuccess(newItem) {
		this.items.push(newItem);
  	}

	// CLEAR ITEMS SUCCESS
	clearItemsSuccess() {
		this.items = [];
	}
}

export default alt.createStore(ToolbarStore);

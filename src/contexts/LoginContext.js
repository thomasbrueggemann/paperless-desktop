import { buildContext } from "./Context";

const initialState = {
	host: "",
	username: "",
	password: ""
};

// reducer actions to mutate state
const reducer = (state, action) => {
	switch (action.type) {
		case "set_username":
			return {
				...state,
				username: action.username
			};
		case "set_host":
			return {
				...state,
				host: action.host
			};
		case "set_password":
			return {
				...state,
				password: action.password
			};
	}
};

export default buildContext(initialState, reducer);

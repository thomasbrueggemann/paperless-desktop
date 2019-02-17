import { buildContext } from "./Context";

const initialState = {
	host: localStorage.getItem("host"),
	username: localStorage.getItem("username"),
	password: localStorage.getItem("password")
};

// reducer actions to mutate state
const reducer = (state, action) => {
	switch (action.type) {
		case "SET_USERNAME":
			localStorage.setItem("username", action.username);
			return {
				...state,
				username: action.username
			};
		case "SET_HOST":
			localStorage.setItem("host", action.host);
			return {
				...state,
				host: action.host
			};
		case "SET_PASSWORD":
			localStorage.setItem("password", action.password);
			return {
				...state,
				password: action.password
			};
	}
};

export default buildContext(initialState, reducer);

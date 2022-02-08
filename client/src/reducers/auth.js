import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case actionType.AUTH:
			console.log("====================================");
			console.log(action?.data);
			console.log("====================================");
			// WE ARE STORING IN A LOCAL STORAGE SO THAT BROWSER STILL KNOWS THAT WE ARE IN A LOCAL STORAGE
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

			return { ...state, authData: action.data, loading: false, errors: null };
		case actionType.LOGOUT:
			localStorage.clear();
			return { ...state, authData: null, loading: false, errors: null };
		default:
			return state;
	}
};

export default authReducer;

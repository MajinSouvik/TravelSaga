import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import popUpReducer from "./popUpReducer";

const rootReducer=combineReducers({
    image:imageReducer,
    popUp:popUpReducer
})

export default rootReducer
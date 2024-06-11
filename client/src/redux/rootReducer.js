import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import popUpReducer from "./popUpReducer";
import authReducer from "./authReducer";
import feedReducer from "./feedReducer";

const rootReducer=combineReducers({
    image:imageReducer,
    popUp:popUpReducer,
    auth:authReducer,
    feeds:feedReducer
})

export default rootReducer
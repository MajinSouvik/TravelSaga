import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import popUpReducer from "./popUpReducer";
import authReducer from "./authReducer";
import feedReducer from "./feedReducer";
import commentReducer from "./commentReducer"

const rootReducer=combineReducers({
    image:imageReducer,
    popUp:popUpReducer,
    auth:authReducer,
    feeds:feedReducer,
    comments:commentReducer
})

export default rootReducer
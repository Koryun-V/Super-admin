import {combineReducers} from "redux";
import {login} from "./login";
import {store} from "./store";
import {statistics} from "./statistics";
import {admin} from "./admin";
import {updateAdmin} from "./updateAdmin";
import {changePasswordAdmin} from "./changePassword";



export const rootReducer = combineReducers({
    login,
    store,
    statistics,
    admin,
    updateAdmin,
    changePasswordAdmin
})

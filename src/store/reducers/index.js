import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import cartSumReducer from "./cartSumReducer";
import orderReducer from "./orderReducer";


const rootReducer = combineReducers({
    cartReducer,
    cartSumReducer,
    orderReducer
})

export default rootReducer;

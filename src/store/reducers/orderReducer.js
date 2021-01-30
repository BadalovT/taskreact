import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const orderReducer = (state = initialState.priceAllBasketProducts, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      state = action.payload
      return state;
  
    default:
      return state;
  }
};

export default orderReducer;

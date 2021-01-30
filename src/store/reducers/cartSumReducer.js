import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const cartSumReducer = (state = initialState.priceAllBasketProducts, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRICE_ALL_BASKET_PRODUCTS:
      state = action.payload
      return state;
  
    default:
      return state;
  }
};

export default cartSumReducer;

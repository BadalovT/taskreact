import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.id
      );
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newState;
      } else {
        localStorage.setItem("cart",JSON.stringify([...state,{ ...action.payload }]))
        return [...state, { ...action.payload }];
      }
    case actionTypes.COUNT_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.product.id
      );
      var newState = state.map((cartItem) => {
        if (cartItem.product.id === action.payload.product.product.id) {

          if (action.payload.type == "up") {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          } else {
            if (addedItem.quantity > 1) {
              return Object.assign({}, addedItem, {
                quantity: addedItem.quantity - 1,
              });
            }
          }
        }
        return cartItem;
      });
      return newState;

    case actionTypes.REMOVE_FROM_CART:
      const newState2 = state.filter(
        (cartItem) => cartItem.product.id !== action.payload.id
      );
      return newState2;
    case actionTypes.REMOVE_ALL_FROM_CART:
      state = [];
      return state;
    default:
      return state;
  }
};

export default cartReducer;

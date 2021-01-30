import * as actionTypes from "./actionTypes";

export const addToCart =(cartItem)=> {
    return {type: actionTypes.ADD_TO_CART, payload: cartItem}
}

export const countCart =(cartItem)=> {
    return {type: actionTypes.COUNT_CART, payload: cartItem}
}

export const addPriceAllBasketProducts =(price)=> {
    return {type: actionTypes.ADD_PRICE_ALL_BASKET_PRODUCTS, payload: price}
}

export const removeFromCart =(product)=> {
    return {type: actionTypes.REMOVE_FROM_CART, payload: product}
}

export const removeAllFromCart =()=> {
    return {type: actionTypes.REMOVE_ALL_FROM_CART, payload: ""}
}


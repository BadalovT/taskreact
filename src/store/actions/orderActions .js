import * as actionTypes from "./actionTypes";

export const addOrder =(order)=> {
    return {type: actionTypes.ADD_ORDER, payload: order}
}


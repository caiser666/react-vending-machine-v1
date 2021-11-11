import { cartConstants } from "../constants";

export const addCartListAction = (product) => {
  var cart = {
    product: product,
    quantity: 1,
  };

  return (dispatch) => {
    dispatch({
      type: cartConstants.ADD_CART_LIST,
      payload: cart,
    });
  };
};

export const updateCartItemAction = (carts) => {
  return (dispatch) => {
    dispatch({
      type: cartConstants.UPDATE_CART_ITEM,
      payload: carts,
    });
  };
};

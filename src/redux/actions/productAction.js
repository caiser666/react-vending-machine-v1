import { productConstants } from "../constants";

export const getAllProductsAction = (products) => {
  return (dispatch) => {
    dispatch({
      type: productConstants.GET_ALL_PRODUCTS,
      payload: products,
    });
  };
};

export const updateProductsAction = (products) => {
  return (dispatch) => {
    dispatch({
      type: productConstants.UPDATE_PRODUCTS,
      payload: products,
    });
  };
};

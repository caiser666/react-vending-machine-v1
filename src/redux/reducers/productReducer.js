import { productConstants } from "../constants";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS:
      state = {
        ...state,
        products: action.payload
      };
      break;

      case productConstants.UPDATE_PRODUCTS:
      state = {
        ...state,
        products: action.payload
      };
      break;

    default:
      break;
  }

  return state;
};

export default productReducer;

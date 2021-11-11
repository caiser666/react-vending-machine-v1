import { cartConstants } from "../constants";

const initialState = {
  carts: [],
};

const cartReducer = (state = initialState, action) => {
  // console.log(`authReducer ${action.type}`);
  switch (action.type) {
    case cartConstants.ADD_CART_LIST:
      state = {
        ...state,
        carts: [action.payload, ...state.carts]
      };
      break;

    case cartConstants.UPDATE_CART_ITEM:
      state = {
        ...state,
        carts: action.payload
      };
      break;

    default:
      break;
  }

  return state;
};

export default cartReducer;

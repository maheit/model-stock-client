import { dashboard } from "../../../constants/store/dashboard";

export const addProductToCart = (product) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: dashboard.ADD_PRODUCT_TO_CART,
        product,
      });
    }, 700);
  };
};

export const removeProductFromCart = (productId) => {
  return {
    type: dashboard.REMOVE_PRODUCT_FROM_CART,
    productId: productId,
  };
};

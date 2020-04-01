import { dashboard } from "../../constants/store/dashboard";
const addProductToCart = (product, state) => {
  let updatedCart = [...state.cart];
  let indexInCart = updatedCart.findIndex((value) => {
    return value.id === product.id;
  });
  if (indexInCart < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    let updateCartItem = updatedCart[indexInCart];
    updateCartItem.quantity++;
    updatedCart[indexInCart] = updateCartItem;
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  let updatedCart = [...state.cart];
  let indexInCart = updatedCart.findIndex((value) => {
    return value.id === productId;
  });
  let updateCartItem = updatedCart[indexInCart];
  updateCartItem.quantity--;
  if (updateCartItem.quantity <= 0) {
    updatedCart.splice(indexInCart, 1);
  } else {
    updatedCart[indexInCart] = updateCartItem;
  }
  return { ...state, cart: updatedCart };
};

export const shopReducers = (state, action) => {
  switch (action.type) {
    case dashboard.ADD_PRODUCT_TO_CART: {
      return addProductToCart(action.product, state);
    }
    case dashboard.REMOVE_PRODUCT_FROM_CART: {
      return removeProductFromCart(action.productId, state);
    }
    default:
      return state;
  }
};

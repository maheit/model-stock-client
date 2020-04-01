import { dashboard } from "../constants/store/dashboard";

const initialState = {
  products: [
    { id: "1", title: "mouse", price: 29.99 },
    { id: "2", title: "keyboard", price: 292.99 },
    { id: "3", title: "used rams", price: 885.99 },
    { id: "4", title: "hard disk", price: 579.99 },
  ],
  cart: [],
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboard.ADD_PRODUCT_TO_CART: {
      let updatedCart = [...state.cart];
      let indexInCart = updatedCart.findIndex((value) => {
        return value.id === action.product.id;
      });
      if (indexInCart < 0) {
        updatedCart.push({ ...action.product, quantity: 1 });
      } else {
        let updateCartItem = updatedCart[indexInCart];
        updateCartItem.quantity++;
        updatedCart[indexInCart] = updateCartItem;
      }
      return { ...state, cart: updatedCart };
    }
    case dashboard.REMOVE_PRODUCT_FROM_CART: {
      let updatedCart = [...state.cart];
      let indexInCart = updatedCart.findIndex((value) => {
        return value.id === action.productId;
      });
      let updateCartItem = updatedCart[indexInCart];
      updateCartItem.quantity--;
      if (updateCartItem.quantity <= 0) {
        updatedCart.splice(indexInCart, 1);
      } else {
        updatedCart[indexInCart] = updateCartItem;
      }
      return { ...state, cart: updatedCart };
    }
    default:
      return state;
  }
};

export default shopReducer;

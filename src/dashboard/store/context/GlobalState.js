import React, { useState, useReducer } from "react";
import ShopContext from "./Shop-Context";
import { dashboard } from "../../constants/store/dashboard";
import { shopReducers } from "./reducers";

export default (props) => {
  const [products, setProducts] = useState([
    { id: "1", title: "mouse", price: 29.99 },
    { id: "2", title: "keyboard", price: 292.99 },
    { id: "3", title: "used rams", price: 885.99 },
    { id: "4", title: "hard disk", price: 579.99 },
  ]);

  // const [cart, setCart] = useState([]);
  const [cartState, dispatch] = useReducer(shopReducers, { cart: [] });
  const addProductToCart = (product) => {
    dispatch({ type: dashboard.ADD_PRODUCT_TO_CART, product });
  };

  const removeProductFromCart = (productId) => {
    dispatch({ type: dashboard.REMOVE_PRODUCT_FROM_CART, productId });
  };

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

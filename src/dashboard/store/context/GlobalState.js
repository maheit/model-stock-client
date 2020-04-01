import React, { useState } from "react";
import ShopContext from "./Shop-Context";

export default (props) => {
  const [products, setProducts] = useState([
    { id: "1", title: "mouse", price: 29.99 },
    { id: "2", title: "keyboard", price: 292.99 },
    { id: "3", title: "used rams", price: 885.99 },
    { id: "4", title: "hard disk", price: 579.99 },
  ]);

  const [cart, setCart] = useState([]);
  const addProductToCart = (product) => {
    let updatedCart = [...cart];
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
    setCart(updatedCart);
  };

  const removeProductFromCart = (productId) => {
    let updatedCart = [...cart];
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
    setCart(updatedCart);
  };

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

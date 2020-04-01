import React from "react";

export default React.createContext({
  products: [
    { id: "1", title: "mouse", price: 29.99 },
    { id: "2", title: "keyboard", price: 292.99 },
    { id: "3", title: "used rams", price: 885.99 },
    { id: "4", title: "hard disk", price: 579.99 },
  ],
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
});

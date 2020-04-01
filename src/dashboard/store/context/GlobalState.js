import React, { Component } from "react";
import ShopContext from "./Shop-Context";

export default class GlobalState extends Component {
  state = {
    products: [
      { id: "1", title: "mouse", price: 29.99 },
      { id: "2", title: "keyboard", price: 292.99 },
      { id: "3", title: "used rams", price: 885.99 },
      { id: "4", title: "hard disk", price: 579.99 },
    ],
    cart: [],
  };

  addProductToCart = (product) => {
    let updatedCart = [...this.state.cart];
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
    this.setState({
      cart: updatedCart,
    });
  };

  removeProductFromCart = (productId) => {
    let updatedCart = [...this.state.cart];
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
    this.setState({
      cart: updatedCart,
    });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          products: this.state.products,
          cart: this.state.cart,
          addProductToCart: this.addProductToCart,
          removeProductFromCart: this.removeProductFromCart,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

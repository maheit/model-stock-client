import React, { Component } from "react";
import { connect } from "react-redux";
import MainNavigation from "./MainNavigation";

import { addProductToCart } from "../../actions/dashboard";
import "../../styles/Product.css";

class Product extends Component {
  render() {
    return (
      <React.Fragment>
        <MainNavigation cartItemNumber={this.props.cartItemCount} />

        <main className="products">
          <ul>
            {this.props.products.map((product) => (
              <li key={product.id}>
                <div>
                  <strong>{product.title}</strong> - ${product.price}
                </div>
                <div>
                  <button
                    onClick={this.props.addProductToCart.bind(this, product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.shopReducer.products,
    cartItemCount: state.shopReducer.cart.reduce((total, items) => {
      return total + items.quantity;
    }, 0),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(addProductToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

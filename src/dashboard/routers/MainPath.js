import React, { Component } from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
// import createBrowserHistory from "history/createBrowserHistory";

import Product from "../components/dashboard/Product";
import Cart from "../components/dashboard/Cart";
import MainNavigation from "../components/dashboard/MainNavigation";

import ShopContext from "../store/context/Shop-Context";
// const history = createBrowserHistory();

class MainPath extends Component {
  render() {
    return (
      <ShopContext.Consumer>
        {(context) => {
          return (
            <React.Fragment>
              <BrowserRouter>
                <MainNavigation
                  cartItemNumber={context.cart.reduce((total, items) => {
                    return total + items.quantity;
                  }, 0)}
                />
                <Switch>
                  <Route path="/" component={Product} exact />
                  <Route path="/cart" component={Cart} exact />
                </Switch>
              </BrowserRouter>
            </React.Fragment>
          );
        }}
      </ShopContext.Consumer>
    );
  }
}

export default MainPath;

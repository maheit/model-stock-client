import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Product from "./components/dashboard/Product";
import Cart from "./components/dashboard/Cart";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Product} exact />
          <Route path="/cart" component={Cart} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

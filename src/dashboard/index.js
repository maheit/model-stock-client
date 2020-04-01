import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configStore from "./store/redux/store";

import App from "./App";

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

import React, { Component } from "react";
import MainPath from "./routers/MainPath";
import GlobalState from "./store/context/GlobalState";

class App extends Component {
  render() {
    return (
      <GlobalState>
        <MainPath />
      </GlobalState>
    );
  }
}

export default App;

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;
import shopReducer from "../../reducers/dashboard";

export default () => {
  const store = createStore(
    combineReducers({ shopReducer: shopReducer }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

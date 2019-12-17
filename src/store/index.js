import { createStore, compose, applyMiddleware } from "redux";

import rootReducer from "../reducers";

let composeEnhancers = compose;

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const middlewares = [];
const enhancers = [applyMiddleware(...middlewares)];

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

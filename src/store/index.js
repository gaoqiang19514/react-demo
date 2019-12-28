import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  middlewares.push(loggerMiddleware);
}

const enhancers = [applyMiddleware(...middlewares)];

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(...enhancers)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;

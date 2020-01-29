import { init } from "@rematch/core";
import { createLogger } from "redux-logger";

import * as models from "../models";

const reduxLogger = createLogger();

const middlewares = [];
if (process.env.NODE_ENV === "development") {
  middlewares.push(reduxLogger);
}

const store = init({
  models,
  redux: {
    middlewares
  }
});

export default store;

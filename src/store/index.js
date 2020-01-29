import { init } from "@rematch/core";

import * as models from "../models";

const middlewares = [];
if (process.env.NODE_ENV === "development") {
}

const store = init({
  models,
  redux: {
    middlewares
  }
});

export default store;

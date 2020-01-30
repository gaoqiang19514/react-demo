import { init } from "@rematch/core";

import * as models from "../models";

const middlewares = [];
if (process.env.NODE_ENV === "development") {
}

const getStatePlugin = () => ({
  onStoreCreated(store) {
    return {
      getState: store.getState // Set it to the same value but now knows about it?
    };
  }
});

const store = init({
  models,
  plugins: [getStatePlugin],
  redux: {
    middlewares
  }
});

export default store;

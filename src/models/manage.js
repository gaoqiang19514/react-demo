import store from "../store";

export default {
  state: {
    count: 0
  },
  reducers: {
    increment: (state, payload) => {
      return {
        ...state,
        count: state.count + 1
      };
    }
  },
  effects: {
    async asyncIncrement(payload, rootState) {
      console.log(store.getState());
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
      this.increment();
      console.log(store.getState());
    }
  }
};

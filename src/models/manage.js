export default {
  state: {
    count: 99
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
    async asyncIncrement() {
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
      this.increment();
    }
  }
};

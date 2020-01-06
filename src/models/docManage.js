export default {
  state: {
    name: "docManage",
    count: 2
  },
  reducers: {
    increment: (state, payload) => {
      return {
        ...state,
        count: state.count + payload
      };
    }
  },
  effects: dispatch => ({
    async asyncIncrement() {
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
      this.increment(21);
    }
  })
};

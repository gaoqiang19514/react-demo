export default {
  state: {
    name: "searchKey",
    count: 1
  },
  reducers: {
    increment: s => s + 1
  },
  effects: dispatch => ({
    async asyncIncrement() {
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
      dispatch.searchKey.increment();
    }
  })
};

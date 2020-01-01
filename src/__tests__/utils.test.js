import utils from "../utils";

describe("test createEchartsDispatchActionData", () => {
  it("createEchartsDispatchActionData result length toBe 10", () => {
    const result = utils.createEchartsDispatchActionData(0, 10);
    expect(result.length).toBe(10);
  });

  it("createEchartsDispatchActionData result length toBe 100", () => {
    const result = utils.createEchartsDispatchActionData(0, 100);
    expect(result.length).toBe(100);
  });

  it("createEchartsDispatchActionData result length toBe 1", () => {
    const result = utils.createEchartsDispatchActionData(0, 1);
    expect(result.length).toBe(1);
  });
});

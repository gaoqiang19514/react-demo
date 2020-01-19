import foreach from "./foreach.js";

describe("test init", () => {
  it("test mock sum2", () => {
    expect(1).toBe(1);
  });
});

describe("jest.fn test", () => {
  it("test foreach use mock", () => {
    const fn = jest.fn();
    const arr = [1, 2, 3];
    foreach(arr, fn);

    expect(fn).toBeCalled();
    expect(fn.mock.calls.length).toBe(3);

    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[1][0]).toBe(2);
    expect(fn.mock.calls[2][0]).toBe(3);
  });
});

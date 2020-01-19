import sum, { div } from "./sum";

jest.mock("./sum");

describe("jest.mock test", () => {
  it("1 plus 2 equal 100", () => {
    expect(sum(1, 2)).toBe(100);
  });

  it("10 div 2 equal 1000", () => {
    expect(div(10, 2)).toBe(1000);
  });
});

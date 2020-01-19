import user, { getUserName } from "./user";

jest.mock("./user");
jest.mock("../request");

describe("jest.mock test", () => {
  it("if user model is mocked", () => {
    // expect(user.getAuthenticated()).toEqual({age: 26, name: "Real name"});
    expect(user.getAuthenticated()).toEqual({ age: 622, name: "Mock name" });
  });

  // Testing promise can be done using `.resolves`.
  it("works with resolves", () => {
    return expect(getUserName(4)).resolves.toEqual("Mark");
  });
});

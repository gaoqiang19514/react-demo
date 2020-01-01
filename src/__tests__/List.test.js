import React from "react";
import { shallow } from "enzyme";

import List from "../List";

it("list has li toBe 0", () => {
  const list = shallow(<List data={[]} />);
  const list2 = shallow(<List data={[1, 2, 3, 4]} />);
  expect(list.find("li").length).toBe(0);
  expect(list2.find("li").length).toBe(4);
});

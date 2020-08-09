import React from "react";

import List from "./components/List";
import Item from "./components/Item";
import Mouse from "./components/Mouse";
import Cat from "./components/Cat";

function App() {
  const data = [
    {
      id: 1,
      name: "tomcat",
    },
    {
      id: 2,
      name: "lina",
    },
  ];

  return (
    <>
      <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      <List
        render={() => data.map(({ id, name }) => <Item key={id} name={name} />)}
      />
    </>
  );
}

export default App;

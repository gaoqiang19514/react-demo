import React, { useState } from "react";

import Example from "./components/Example";
import WithoutMemo from "./components/WithoutMemo";
import UseMemoExample from "./components/UseMemoExample";

function Demo(props) {
  const [data, setData] = useState([...props.data]);

  const handleClick = () => {
    data.pop();
    setData([...data]);
  };

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={handleClick}>Dome</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Demo data={[1, 2, 3]} />
      <UseMemoExample />
    </div>
  );
}

export default App;

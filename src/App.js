import React from "react";
import { from, fromEvent } from "rxjs";
import { pluck, switchMap } from "rxjs/operators";
import axios from "axios";

function App() {
  const [data, setData] = React.useState([]);
  const button = React.useRef();

  React.useEffect(() => {
    fromEvent(button.current, "click")
      .pipe(
        switchMap(() => {
          return from(axios.get("/user"));
        }),
        pluck("data", "data")
      )
      .subscribe((res) => {
        setData(res.users);
      });
  });

  return (
    <div className="App">
      <button ref={button} type="button">
        button
      </button>
      <ul>
        {data.map(({ id, name, interval }) => (
          <li key={id}>
            {name}-{interval}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

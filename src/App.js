import React from "react";
import { from, fromEvent } from "rxjs";
import { pluck, map, debounceTime, switchMap, filter } from "rxjs/operators";
import axios from "axios";

function loadSuggestList(e) {
  return axios.get("/user", {
    params: {
      key: e.target.innerHTML,
    },
  });
}

function SelectList() {
  const [list, setList] = React.useState([
    {
      id: 1,
      name: "tom",
    },
    {
      id: 2,
      name: "lina",
    },
  ]);
  const ul = React.useRef();

  React.useEffect(() => {
    fromEvent(ul.current, "click")
      .pipe(
        filter((e) => e.target.matches("li")),
        switchMap(loadSuggestList)
      )
      .subscribe((res) => {
        console.log(res.data.data.users[0].key);
      });
  }, []);

  return (
    <>
      <ul ref={ul}>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

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
      <SelectList />
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

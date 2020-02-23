import React, { useState, useMemo } from "react";

function expensiveFn() {
  console.log("expensiveFn");
  let result = 0;

  for (let i = 0; i < 10000; i++) {
    result += i;
  }

  return result;
}

function UseMemoExample(props) {
  const [count, setCount] = useState(0);

  let base = useMemo(expensiveFn, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(base + count)}>update count</button>
    </div>
  );
}

export default UseMemoExample;

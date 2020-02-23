import React, { memo, useState, useCallback, useMemo } from "react";

function Child(props) {
  console.log(props.name);
  return (
    <>
      <h2>子元素：{props.name}</h2>
      <button onClick={props.onClick}>修改父组件的标题</button>
    </>
  );
}

const ChildAfter = memo(Child);

function WithoutMemo(props) {
  const [title, setTitle] = useState("初始title");

  const onClick = useCallback(() => {
    setTitle('sdfsda');
  }, []);

  return (
    <div>
      <h1>父元素：{title}</h1>
      <ChildAfter onClick={onClick} name="桃子" />
    </div>
  );
}

export default WithoutMemo;

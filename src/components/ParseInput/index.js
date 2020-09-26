import React, { useState, useRef } from "react";

import {
  Main,
  Aside,
  DisplayBox,
  Textarea,
  TextareaBox,
  TextareaOutBox,
} from "./styled";
import Display from "../Display";

function ParseInput() {
  const ref = useRef(null);
  const [dataSource, setDataSource] = useState([]);

  const onInput = (e) => {
    setDataSource(parseString(e.target.value));
  };

  const parseString = (str) => {
    const nameSpace = {};
    const newestNameSpace = {};
    const lines = str.split("\n");

    const arr = lines.map((line) => line.split(/\s+/));

    arr.forEach(([key, value]) => {
      if (!key) {
        return;
      }

      if (nameSpace[key]) {
        nameSpace[key].push(value);
      } else {
        nameSpace[key] = [value];
      }
    });

    Object.keys(nameSpace).forEach((key) => {
      const temp = nameSpace[key].reduce(
        (total, count) => total + Number(count),
        0
      );
      newestNameSpace[key] = temp;
    });

    const result = Object.keys(newestNameSpace).map((key, index) => ({
      id: index + 1,
      serial: index + 1,
      name: key,
      count: newestNameSpace[key],
    }));

    return result;
  };

  return (
    <>
      <Aside>
        <TextareaOutBox>
          <TextareaBox>
            <Textarea ref={ref} onInput={onInput} />
          </TextareaBox>
        </TextareaOutBox>
      </Aside>
      <Main>
        <DisplayBox>
          <Display dataSource={dataSource} />
        </DisplayBox>
      </Main>
    </>
  );
}

export default ParseInput;

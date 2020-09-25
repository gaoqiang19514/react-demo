import React, { useState, useRef } from "react";

import {
  Main,
  MainItem,
  PaddingPrimary,
  Textarea,
  TextareaBox,
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
      serial: index + 1,
      name: key,
      count: newestNameSpace[key],
    }));

    return result;
  };

  return (
    <Main>
      <MainItem>
        <PaddingPrimary>
          <TextareaBox>
            <Textarea ref={ref} onInput={onInput} />
          </TextareaBox>
        </PaddingPrimary>
      </MainItem>
      <MainItem>
        <PaddingPrimary>
          <Display dataSource={dataSource} />
        </PaddingPrimary>
      </MainItem>
    </Main>
  );
}

export default ParseInput;

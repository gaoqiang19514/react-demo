import React, { useState, useRef } from "react";
import { Button } from "antd";

import {
  TextRight,
  PaddingPrimary,
  PaddingHorizontalPrimary,
  Textarea,
  TextareaBox,
} from "./styled";
import Display from "../Display";

function ParseInput() {
  const ref = useRef(null);
  const [dataSource, setDataSource] = useState("");

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
    <div>
      <PaddingPrimary>
        <TextareaBox>
          <Textarea ref={ref} onInput={onInput} />
        </TextareaBox>
      </PaddingPrimary>
      <PaddingHorizontalPrimary>
        <TextRight>
          <Button type="primary">计算</Button>
        </TextRight>
      </PaddingHorizontalPrimary>
      <PaddingPrimary>
        <Display dataSource={dataSource} />
      </PaddingPrimary>
    </div>
  );
}

export default ParseInput;

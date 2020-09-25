import React, { useState, useRef } from "react";
import { Button } from "antd";

import {
  TextRight,
  PaddingPrimary,
  PaddingHorizontalPrimary,
  Textarea,
  TextareaBox,
} from "./styled";

function ParseInput() {
  const ref = useRef(null);
  const [input, setInput] = useState("");

  const onInput = (e) => {
    setInput(e.target.value);
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
      <PaddingPrimary>{input}</PaddingPrimary>
    </div>
  );
}

export default ParseInput;

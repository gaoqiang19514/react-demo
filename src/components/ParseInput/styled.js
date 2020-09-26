import styled from "styled-components";

export const PaddingPrimary = styled.div`
  padding: 20px;
`;

export const PaddingHorizontalPrimary = styled.div`
  padding: 0 20px;
`;

export const TextRight = styled.div`
  text-align: right;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  font-size: 16px;
  resize: none;
  :focus {
    outline: none;
  }
`;

export const TextareaBox = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  height: 100%;
`;

export const TextareaOutBox = styled.div`
  padding: 20px;
  height: 100%;
`;

export const Aside = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
`;

export const Main = styled.div`
  margin-left: 300px;
`;

export const DisplayBox = styled.div`
  padding: 20px 20px 20px 0;
`;

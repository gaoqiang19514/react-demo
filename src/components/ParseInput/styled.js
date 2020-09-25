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
  height: 300px;
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
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainItem = styled.div`
  flex: 1;
`;

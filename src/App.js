import React from "react";
import { useRequest } from "@umijs/hooks";
import styled from "styled-components";

import SwitchControl from "./components/SwitchControl";

const Container = styled.div`
  padding: 20px;
`;

function App() {
  const [typeList, setTypeList] = React.useState([
    {
      name: "case",
      checked: true,
    },
    {
      name: "problem",
      checked: true,
    },
  ]);

  const canRender = (name) => {
    let flag = false;

    typeList.forEach((item) => {
      if (item.name === name && item.checked) {
        flag = true;
      }
    });

    return flag;
  };

  const { error, loading, run } = useRequest(
    {
      url: "/api/getUsername",
      method: "get",
    },
    {
      manual: true,
      fetchKey: (name) => name,
      onSuccess: (data, params) => {
        if (canRender(params[0])) {
          console.log("render");
          // 更新UI
        }
      },
    }
  );

  React.useEffect(() => {
    typeList.map((item) => {
      if (item.checked) {
        run(item.name);
      }
    });
  }, [typeList]);

  const handleClick = (name) => {
    const temp = typeList.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return {
        ...item,
      };
    });

    setTypeList(temp);
  };

  return (
    <Container>
      <SwitchControl typeList={typeList} onChange={handleClick} />
    </Container>
  );
}

export default App;

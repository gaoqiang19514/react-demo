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
      checked: false,
    },
    {
      name: "problem",
      checked: false,
    },
  ]);

  const { data, error, loading, run } = useRequest(
    {
      url: "/api/getUsername",
      method: "get",
    },
    {
      manual: true,
    }
  );

  React.useEffect(() => {
    run();
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
      <div>{data?.data?.name ?? "none"}</div>
    </Container>
  );
}

export default App;

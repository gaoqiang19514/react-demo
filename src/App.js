import React from "react";
import { useMount, useRequest } from "ahooks";
import styled from "styled-components";
import axios from "axios";

import SwitchControl from "./components/SwitchControl";

const Container = styled.div`
  padding: 20px;
`;

function getData(path) {
  return axios.get(path);
}

function App() {
  const [typeList, setTypeList] = React.useState([
    {
      name: "case",
      path: "/case",
      checked: true,
    },
    {
      name: "problem",
      path: "/problem",
      checked: true,
    },
  ]);

  const { run, fetches } = useRequest(getData, {
    manual: true,
    fetchKey: (id) => id,
  });

  useMount(() => {
    typeList.forEach((item) => {
      if (item.checked) {
        run(item.path);
      }
    });
  });

  const handleChange = (name, path, checked) => {
    const newestChecked = !checked;
    // 1. 更新ui
    const newestTypeList = typeList.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: newestChecked,
        };
      }
      return { ...item };
    });
    setTypeList(newestTypeList);

    // 2. 发起请求
    if (newestChecked) {
      run(path);
    }
  };

  return (
    <Container>
      <SwitchControl typeList={typeList} onChange={handleChange} />
    </Container>
  );
}

export default App;

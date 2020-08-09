import React from "react";
import Tabs, { TabPane } from "@bit/tomcat.react-components.tabs";

import Demo from "./Demo";

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabPane key="1" title="科技">
          科技内容
        </TabPane>
        <TabPane key="2" title="娱乐">
          娱乐内容
        </TabPane>
      </Tabs>
      <Demo />
    </div>
  );
}

export default App;

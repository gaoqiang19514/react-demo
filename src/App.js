import React from "react";
import Hero from "@bit/bit.movie-app.components.hero";

import Tabs, { TabPane } from "./Tabs";

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
      <Hero
        title="Season 66 will be available soon!"
        description="Lorem ipsum dolor sit amet hey! id quam sapiente unde voluptatum alias vero debitis, magnam quis quod."
      />
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setIndex } from "@/actions";

function Detail({ index, setIndex }) {
  const handleClick = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    console.log("loadData");
  }, [index]);

  return (
    <div>
      <h1>Detail</h1>
      <p>当前视图：{index}</p>
      <button type="button" onClick={handleClick}>
        change index
      </button>
    </div>
  );
}

const mapState = (state) => ({
  index: state.index,
});

export default connect(mapState, { setIndex })(Detail);

import React from "react";

import "./style.css";

function NineGrid() {
  return (
    <div className="nine-grid">
      <ul className="list">
        <li className="item">
          <div className="item-inner">1</div>
        </li>
        <li className="item">
          <div className="item-inner">2</div>
        </li>
        <li className="item">
          <div className="item-inner">3</div>
        </li>
        <li className="item">
          <div className="item-inner">4</div>
        </li>
        <li className="item">
          <div className="item-inner">5</div>
        </li>
        <li className="item">
          <div className="item-inner">6</div>
        </li>
        <li className="item">
          <div className="item-inner">7</div>
        </li>
        <li className="item">
          <div className="item-inner">8</div>
        </li>
        <li className="item">
          <div className="item-inner">9</div>
        </li>
      </ul>
    </div>
  );
}

export default NineGrid;

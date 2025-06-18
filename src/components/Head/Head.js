import React from "react";
import auntHead from "./aunt_head.png";
import "./Head.scss";
function Head() {
  return (
    <div className="Head">
      <img src={auntHead} alt="" />
      <h1>王郁甄</h1>
      <p>Juliet</p>
    </div>
  );
}

export default Head;

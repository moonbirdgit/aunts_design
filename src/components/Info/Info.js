import React from "react";
import "./Info.scss";
import gmail from "./gmail.png";
import phone from "./phone.png";
function Info() {
  return (
    <div className="Info">
      <div className="gmail">
        <img src={gmail} alt="" />
        <p>s950117@gmail.com</p>
      </div>
      <div className="phone">
        <img src={phone} alt="" />
        <p>0922950121</p>
      </div>
    </div>
  );
}

export default Info;

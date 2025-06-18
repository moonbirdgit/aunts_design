import React from "react";
import "./Layout.scss";
// 1. 確認這兩行 import 存在
import { menuData } from "./menuData";
import MenuItem from "./MenuItem";

function Layout() {
  return (
    <div className="Layout">
      <nav>
        <ul>
          {menuData.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Layout;

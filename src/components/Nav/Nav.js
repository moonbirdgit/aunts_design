// src/components/Nav/Nav.js

import React from "react";
import Layout from "../Layout/Layout";
import Head from "../Head/Head";
import Info from "../Info/Info";
import "./Nav.scss";

function Nav({ isCollapsed, onToggle }) {
  return (
    // 這是「外層容器」，只負責定位和收合動畫
    <nav className={`Nav ${isCollapsed ? "is-collapsed" : ""}`}>
      {/* 半圓形按鈕是外層的直接子元素，所以它不會被 overflow 裁切 */}
      <div className="Nav__toggle" onClick={onToggle}></div>

      {/* ✅ 新增：這是「內層滾動容器」 */}
      <div className="Nav__content-wrapper">
        {/* 所有需要滾動的內容都移到裡面 */}
        <Head />
        <Layout />
        <Info />
      </div>
    </nav>
  );
}

export default Nav;

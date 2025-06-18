// src/components/Layout/MenuItem.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

const ArrowIcon = () => (
  <svg
    className="menu-item-arrow"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

function MenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li
      className={`${hasChildren ? "has-children" : ""} ${
        isOpen ? "is-open" : ""
      }`}
    >
      {/* 整個標題列都可以觸發展開/收合 */}
      <div className="menu-item-title" onClick={handleToggle}>
        {/* ✅ 【核心修改】使用條件渲染來決定是否顯示 <Link> */}
        {hasChildren ? (
          // 如果有子項目，只渲染一個普通的 span，它不可點擊跳轉
          <span>{item.name}</span>
        ) : (
          // 如果沒有子項目，才渲染成一個可以跳轉的 Link
          <Link to={item.link}>{item.name}</Link>
        )}

        {/* 箭頭的顯示邏輯保持不變 */}
        {hasChildren && <ArrowIcon />}
      </div>

      {/* 子選單的渲染邏輯也保持不變 */}
      {hasChildren && (
        <ul className="submenu">
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default MenuItem;

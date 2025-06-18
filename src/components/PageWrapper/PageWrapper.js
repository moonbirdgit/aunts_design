import React from "react";
import { useLocation } from "react-router-dom"; // ✅ 1. 引入 useLocation
import { menuData } from "../Layout/menuData"; // ✅ 2. 引入您的資料來源
import "./PageWrapper.scss";

// ✅ 3. 創建一個輔助函式，用來遞迴查找資料
// (這個函式也可以放在一個單獨的 utils.js 檔案裡)
function findMenuItemByPath(menuItems, pathname) {
  for (const item of menuItems) {
    if (item.link === pathname) {
      return item;
    }
    if (item.children) {
      const found = findMenuItemByPath(item.children, pathname);
      if (found) {
        return found;
      }
    }
  }
  return null; // 如果沒找到就返回 null
}

function PageWrapper({ children }) {
  // ✅ 4. 不再需要接收 title prop
  const location = useLocation(); // 獲取當前位置資訊，例如 { pathname: '/works/banner/books' }
  const currentPath = location.pathname;

  // ✅ 5. 根據當前路徑查找對應的選單項目
  const menuItem = findMenuItemByPath(menuData, currentPath);

  // 如果找到了，就用它的 name 當標題，否則用一個預設值
  const title = menuItem ? menuItem.name : "作品展示";

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">{title}</h1> {/* 使用動態獲取的標題 */}
        <div className="page-underline"></div>
      </header>

      <main className="page-content">{children}</main>
    </div>
  );
}

export default PageWrapper;

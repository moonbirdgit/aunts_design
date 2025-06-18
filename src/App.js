// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./components/Nav/Nav";

// ✅ 1. 移除所有舊的頁面元件 import
// import BannerEventsPage from "./pages/Banner_Pages/events/Events";
// ... (所有其他的都刪掉)

// ✅ 2. 只引入我們那個通用的 PortfolioPage
import PortfolioPage from "./pages/PortfolioPage";

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <BrowserRouter>
      <div className={`App ${isNavCollapsed ? "nav-collapsed" : ""}`}>
        <Nav isCollapsed={isNavCollapsed} onToggle={toggleNav} />

        <main className="MainContent">
          {/* ✅ 3. 將原本複雜的 Routes 替換成下面簡潔的版本 */}
          <Routes>
            {/* 首頁路由保持不變 */}
            <Route path="/" element={<h2>歡迎來到首頁</h2>} />

            {/* 動態路由規則 1：處理沒有子分類的頁面 */}
            {/* 這個規則可以匹配:
                /works/line-sticker
                /works/photography
                /works/logo
            */}
            <Route path="/works/:category" element={<PortfolioPage />} />

            {/* 動態路由規則 2：處理有子分類的頁面 */}
            {/* 這個規則可以匹配:
                /works/banner/events
                /works/prints/packaging
                /works/one-page/books
            */}
            <Route
              path="/works/:category/:subcategory"
              element={<PortfolioPage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

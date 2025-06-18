import React, { useEffect } from "react";
import "./Lightbox.scss";

function Lightbox({ imageUrl, onClose }) {
  // ✅ 1. 將 useEffect 移到元件的最頂層
  useEffect(() => {
    // 只有當 imageUrl 存在時 (也就是燈箱可見時)，才執行副作用
    if (imageUrl) {
      document.body.style.overflow = "hidden";

      // 返回一個清理函式，當燈箱關閉或 imageUrl 改變時，恢復滾動
      return () => {
        document.body.style.overflow = "auto";
      };
    }
    // 如果 imageUrl 不存在，這個 effect 就不做任何事
  }, [imageUrl]); // ✅ 2. 將 imageUrl 加入依賴陣列

  // 3. 提前返回的邏輯保持不變，但它現在位於所有 Hooks 之後
  if (!imageUrl) {
    return null;
  }

  // 剩下的 JSX 保持不變
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content">
        <img
          src={imageUrl}
          alt="放大的作品"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <button className="lightbox-close-button" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Lightbox;

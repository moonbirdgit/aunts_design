import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./ImageGrid.scss";

const BATCH_SIZE = 12;

// ✅ imageUrls 實際上是 imageObjects，我們在函式內部稱呼它為 items
function ImageGrid({ imageUrls: items, onImageClick }) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && visibleCount < items.length) {
      setVisibleCount((prevCount) => prevCount + BATCH_SIZE);
    }
  }, [inView, visibleCount, items.length]);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [items]);

  if (!items || items.length === 0) {
    return <p>這個分類下沒有作品。</p>;
  }

  const visibleItems = items.slice(0, visibleCount);

  // ✅ 創建一個處理點擊事件的函式
  const handleClick = (itemObject) => {
    if (itemObject.externalUrl) {
      // 如果有外部連結，在新分頁中打開
      window.open(itemObject.externalUrl, "_blank", "noopener,noreferrer");
    } else {
      // 否則，觸發燈箱效果
      onImageClick(itemObject.imageUrl);
    }
  };

  return (
    <div className="image-grid">
      {visibleItems.map((item, index) => {
        const isLastItem = index === visibleItems.length - 1;

        return (
          <div
            // ✅ 使用唯一的 imageUrl 作為 key
            key={item.imageUrl}
            ref={isLastItem ? ref : null}
            className="image-grid-item"
            // ✅ 呼叫新的 handleClick 函式
            onClick={() => handleClick(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.title || `作品 ${index + 1}`}
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}

export default ImageGrid;

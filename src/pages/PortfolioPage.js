import React, { useState } from "react"; // ✅ 引入 useState
import { useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import ImageGrid from "../components/ImageGrid/ImageGrid";
import useBucketImages from "../hooks/useBucketImages";
import Lightbox from "../components/Lightbox/Lightbox"; // ✅ 引入 Lightbox 元件

function PortfolioPage() {
  const { category, subcategory } = useParams();
  const folderPath = subcategory ? `${category}/${subcategory}` : category;
  const { images, isLoading, error } = useBucketImages(folderPath);

  // ✅ 新增一個 state 來管理燈箱中要顯示的圖片 URL
  const [selectedImage, setSelectedImage] = useState(null);

  const renderContent = () => {
    if (isLoading) return <p>載入中...</p>;
    if (error) return <p>讀取作品時發生錯誤: {error}</p>;
    // ✅ 將 setSelectedImage 函式傳給 ImageGrid
    return <ImageGrid imageUrls={images} onImageClick={setSelectedImage} />;
  };

  return (
    <PageWrapper>
      {renderContent()}

      {/* ✅ 在這裡渲染 Lightbox 元件 */}
      {/* 當 selectedImage 有值時，Lightbox 就會顯示 */}
      <Lightbox
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)} // 關閉時將 selectedImage 設回 null
      />
    </PageWrapper>
  );
}

export default PortfolioPage;

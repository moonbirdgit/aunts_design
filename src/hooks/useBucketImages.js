import { useState, useEffect } from "react";

// 1. 定義您部署好的 Cloud Run 後端 URL
const BACKEND_URL =
  "https://portfolio-backend-914878326429.us-central1.run.app";

function useBucketImages(folderPath) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 如果 folderPath 為空，就不要發送請求
    if (!folderPath) {
      setIsLoading(false);
      return;
    }

    async function fetchImages() {
      setIsLoading(true);
      setError(null);

      // 2. ✅ 組合請求我們自己後端的 API URL
      const apiUrl = `${BACKEND_URL}/api/images/${folderPath}`;

      try {
        // 3. ✅ 向我們自己的後端發送請求
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Backend service responded with status: ${response.status}`
          );
        }

        // 4. ✅ 我們的後端直接回傳了圖片 URL 陣列，所以直接解析並設定
        const imageUrls = await response.json();
        setImages(imageUrls);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching images from backend:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [folderPath]); // 當 folderPath 改變時，重新獲取資料

  return { images, isLoading, error };
}

export default useBucketImages;

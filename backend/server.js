const express = require("express");
const { Storage } = require("@google-cloud/storage");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
const storage = new Storage();
const bucketName = "aunts";
const links = require("./links.json");

app.use(cors());

async function handleImageRequest(req, res) {
  const { category, subcategory } = req.params;
  const folderPath = subcategory ? `${category}/${subcategory}` : category;

  console.log(`[INFO] Received request for folder: ${folderPath}`);

  try {
    const [files] = await storage
      .bucket(bucketName)
      .getFiles({ prefix: `${folderPath}/` });

    // ✅ 將結果轉換為物件陣列
    const imageObjects = files
      .filter((file) => file.metadata.size > 0)
      .map((file) => {
        const imageUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

        // 從檔案路徑中提取檔名
        const fileNameWithExt = file.name.split("/").pop();
        // 移除副檔名
        const fileName = fileNameWithExt.replace(/\.(jpg|jpeg|png|webp)$/i, "");

        // 檢查檔名是否包含我們的分隔符 "__"
        if (fileName.includes("__")) {
          const parts = fileName.split("__");
          const title = parts[0];
          const linkId = parts[1]; // 第二部分就是 URL

          return {
            imageUrl: imageUrl,
            title: title,
            externalUrl: links[linkId] || null,
          };
        } else {
          // 如果不包含，就只返回基本資訊
          return {
            imageUrl: imageUrl,
            title: fileName.replace(/-/g, " "),
            externalUrl: null,
          };
        }
      });

    console.log(
      `[SUCCESS] Found ${imageObjects.length} items for path [${folderPath}].`
    );
    // ✅ 回傳物件陣列
    res.json(imageObjects);
  } catch (error) {
    console.error(
      `[ERROR] Failed to fetch from GCS for path [${folderPath}]. Error message: ${error.message}`,
      error
    );
    res
      .status(500)
      .send(
        `Internal Server Error. Could not fetch images for path: ${folderPath}`
      );
  }
}

// 路由設定保持不變
app.get("/api/images/:category", handleImageRequest);
app.get("/api/images/:category/:subcategory", handleImageRequest);

app.listen(port, () => {
  console.log(`[INFO] Backend server listening on port ${port}`);
});

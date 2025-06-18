// src/components/Layout/menuData.js

// ✅ 關鍵：確保這裡使用的是 "export const"，而不是只有 "const"
export const menuData = [
  {
    id: 11,
    name: "一頁式設計",
    link: "#",
    children: [
      { id: 111, name: "活動", link: "/works/one-page/events" },
      { id: 112, name: "產品", link: "/works/one-page/products" },
    ],
  },
  { id: 12, name: "手繪", link: "/works/sticker" },
  {
    id: 13,
    name: "印刷品",
    link: "#",
    children: [
      {
        id: 131,
        name: "包裝-卡片-貼紙-其他",
        link: "/works/prints/packaging",
      },
      { id: 132, name: "封面內頁設計", link: "/works/prints/cover" },
      {
        id: 133,
        name: "海報-A4文宣",
        link: "/works/prints/posters-flyers",
      },
    ],
  },
  { id: 14, name: "攝影", link: "/works/photography" },
  {
    id: 15,
    name: "banner",
    link: "#",
    children: [
      { id: 151, name: "活動頁延伸", link: "/works/banner/events" },
      { id: 152, name: "食物", link: "/works/banner/food" },
      { id: 153, name: "書籍", link: "/works/banner/books" },
      { id: 154, name: "其他", link: "/works/banner/else" },
      { id: 155, name: "教育", link: "/works/banner/edu" },
    ],
  },
  { id: 16, name: "LOGO設計", link: "/works/logo" },
  { id: 17, name: "可連結設計", link: "/works/link-design" },
];

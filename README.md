# 作品集網站 — 使用與部署說明

莫蘭迪雅緻 × 溫度敘事的個人作品集網站。純靜態 HTML / CSS / JS，無需編譯，可直接部署到 GitHub Pages。

## 檔案結構

```
portfolio/
├── index.html              首頁（Hero + 精選作品 + About 引言 + 聯絡）
├── work.html               作品列表（含五個案例卡片）
├── about.html              關於我（完整 About）
├── resume.html             履歷
├── css/style.css           全站樣式（色票、間距、動畫都在這）
├── js/main.js              導覽開合 + 捲動進場動畫
└── images/                 放作品圖（WebP）的資料夾
```

> Case Study 內頁（case-oil-station.html 等）尚未建立，作品卡片目前連到這些檔名，待內容完成後再逐一新增。

## 如何部署到 GitHub Pages

1. 在 GitHub 建一個新 repository（例如 `portfolio`）
2. 把 portfolio 資料夾內的所有檔案上傳到 repo
3. 進 repo 的 Settings → Pages → Source 選 `main` 分支、根目錄 `/`
4. 儲存後稍等，網址會是 `你的帳號.github.io/portfolio`

## 上線前必改的地方

這些是佔位文字，請搜尋並替換：

- **「您的姓名」**（resume.html）→ 你的真實姓名
- **「Tiffany」**（各頁導覽列 nav__brand）→ 若想用全名可改
- **「您的聯絡電話 / 您的電子郵件 / 您的作品集」**（resume.html）→ 真實資訊
- **`mailto:你的電子郵件`**（各頁頁尾）→ 你的 email
- **LinkedIn 連結**（各頁頁尾 `href="#"`）→ 你的 LinkedIn 網址
- **下載完整履歷 PDF** 按鈕（resume.html `href="#"`）→ 之後放 PDF 連結
- **「XXX股份有限公司」**（resume.html）→ 視保密考量決定是否填真實公司名

## 換上作品圖

1. 把作品圖轉成 WebP 格式，放進 `images/` 資料夾
2. 在卡片裡，把佔位的 `<div class="work-card__thumb">作品圖待放置</div>`
   換成 `<img class="work-card__thumb" src="images/你的圖.webp" alt="說明" loading="lazy" />`
   （`loading="lazy"` 就是 lazy loading，務必保留）

## 想調整顏色？

打開 `css/style.css`，最上方 `:root` 裡的色彩變數改一個值，全站就跟著變。
色票對照與 WCAG 無障礙說明，見另一份「作品集網站_色票規範.md」。

## 字型

使用 Google Fonts 的 Noto Serif TC（標題）+ Noto Sans TC（內文），
透過 CDN 載入，GitHub Pages 可直接使用，無需額外設定。

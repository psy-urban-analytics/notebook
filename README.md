# 城市分析學習手帳

以心理師的眼光，學習用數據去解讀城市生活。Urban Analytics in Glasgow · 2026–27。

網站：https://psy-urban-analytics.github.io/notebook/

## 三種內容

| 類型 | 資料夾 | 最低發布標準 |
| --- | --- | --- |
| 筆記 | `src/content/notes/` | 標題＋三行字 |
| 觀察 | `src/content/observations/` | 地點＋一張照片或三行字 |
| 習作 | `src/content/works/` | 一張圖＋三句說明 |

只有「標題」和「日期」是必填，其他欄位都可以留空。
勾選「草稿」（`draft: true`）的紀錄不會發布。

`sample-` 開頭的四個檔案是範例，都是草稿，看完格式就可以刪掉。

## 怎麼寫

**後台**：到 https://app.pagescms.org 用 GitHub 登入，選 `psy-urban-analytics/notebook`，
就會看到「筆記、觀察、習作、關於」。存檔後一兩分鐘網站就會更新。

**交給 Claude**：把隨手寫的文字貼給 Claude，說「整理成觀察，發布」。

## 技術

- [Astro](https://astro.build) 靜態網站，內容是 Markdown。
- 推到 `main` 之後，GitHub Actions 會自動建置並發布到 GitHub Pages（`.github/workflows/deploy.yml`）。
- 後台設定在 `.pages.yml`。

本機預覽：`npm install` 後執行 `npm run dev`（草稿在本機看得到）。

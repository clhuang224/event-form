# 線上會議報名表

這是一個以 React Router 與 Tailwind CSS 建立的單頁報名表專案，主要用來實作線上會議報名流程。畫面以客製化表單元件為主，並搭配原生表單驗證與欄位格式驗證。

## 如何使用

### 線上查看

直接開啟 [GitHub Pages](https://clhuang224.github.io/event-form/)。

### 安裝套件

```bash
pnpm run install
```

### 啟動開發環境

```bash
pnpm run dev
```

### 型別檢查

```bash
pnpm run typecheck
```

### 建置正式版本

```bash
pnpm run build
```

## 技術棧

- React 19
- React Router 7
- TypeScript
- Tailwind CSS 4
- Vite
- pnpm

## 資料夾結構

```text
.
├── app
│   ├── assets                # 圖片、按鈕、checkbox / radio / arrow SVG
│   ├── components            # 共用元件
│   ├── constants             # 常數
│   ├── enums                 # Enum 定義
│   ├── hooks                 # 自訂 hooks
│   ├── routes                # 路由頁面
│   ├── utils                 # 驗證與資料轉換工具
│   ├── app.css               # 全域樣式與 theme token
│   ├── root.tsx              # App 入口
│   └── routes.ts             # 路由設定
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 重要元件與 Hook

### 頁面

- `app/routes/home.tsx`
  - 專案的主要頁面。
  - 組合所有表單欄位、管理表單狀態、處理送出邏輯與欄位間的連動關係。
  - 目前包含「晚宴是否參加」與「飲食習慣」的條件式顯示，以及送出 payload 的欄位裁切。

### 共用元件

- `app/components/BaseInput.tsx`
  - 基礎文字輸入欄位。
  - 統一處理 label、hint、error、focus 樣式與右側 adornment。

- `app/components/BaseSelect.tsx`
  - 以 `BaseInput` 為基底改寫的自訂下拉選單。
  - 支援 readonly 顯示、右側箭頭、展開選單，以及選擇 `其他` 時顯示補充輸入欄位。

- `app/components/BaseCheckbox.tsx`
  - 多選欄位元件。
  - 用於會議場次選擇，並額外補上「至少選一個」的原生驗證提示。

- `app/components/BaseRadio.tsx`
  - 單選欄位元件。
  - 支援一般 radio 群組，以及選擇 `其他` 時出現補充輸入欄位。

- `app/components/BaseField.tsx`
  - 表單欄位的共用包裝層。
  - 負責 label、required 標記、錯誤訊息顯示等欄位外框結構。

- `app/components/SubmitButton.tsx`
  - 送出按鈕元件。
  - 使用圖片切換 hover / active 視覺效果。

### Hook

- `app/hooks/useFormField.ts`
  - 用來管理單一欄位的 value、setter 與 error。
  - 支援用 `id` 自動組合回傳欄位名稱，例如 `nameValue`、`setNameValue`、`nameError`。
  - 若傳入 `hasOther`，會額外回傳 `${id}DetailValue` 與對應 setter，方便處理 `其他` 補充欄位。

## 其他補充

- 樣式以 Tailwind class 為主，顏色與尺寸 token 統一放在 `app/app.css`。
- 欄位格式驗證集中在 `app/utils/validator.ts`。
- 選項資料透過 `enums`、`constants`、`getEnumValues`、`getOptionsWithOther` 組合，避免資料散落在頁面內。

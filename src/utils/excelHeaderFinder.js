import * as XLSX from "xlsx";

/**
 * 在工作表前 maxRows 列 × maxCols 欄中，自動定位表頭列並解析出各欄位對應的實際表頭名稱
 *
 * @param {object} worksheet - XLSX worksheet 物件
 * @param {object} fieldKeywordsMap - 欄位關鍵字設定，例如 { productId: ["商品編號", "商品代碼"], inventory: ["本日結存量", "庫存量"] }
 * @param {string} fileLabel - 檔案名稱標籤（用於顯示清楚的錯誤訊息）
 * @param {number} maxRows - 掃描最大列數（預設 20）
 * @param {number} maxCols - 掃描最大欄數（預設 20）
 * @returns {{ headerRowIndex: number, matchedColumns: object, jsonData: Array }}
 */
export function parseSheetByKeywords(
  worksheet,
  fieldKeywordsMap,
  fileLabel = "檔案",
  maxRows = 20,
  maxCols = 20
) {
  const fieldKeys = Object.keys(fieldKeywordsMap);
  // 以第一個定義的欄位（通常是主鍵，如 productId 或 serial）作為判定表頭列的依據
  const anchorFieldKey = fieldKeys[0];
  const anchorKeywords = fieldKeywordsMap[anchorFieldKey];

  let headerRowIndex = -1;
  // 記錄表頭列儲存格文字對應表: { "去除空白後的表頭文字": "原始表頭文字(供 sheet_to_json 直接讀取)" }
  let trimmedToRawHeaderMap = {};

  // 1. 掃描前 maxRows 列，找出包含主鍵關鍵字的那一列
  for (let r = 0; r < maxRows; r++) {
    const currentRowMap = {};
    for (let c = 0; c < maxCols; c++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r, c })];
      if (cell && cell.v !== undefined && cell.v !== null) {
        const rawText = String(cell.v);
        const trimmedText = rawText.trim();
        // 同名欄位若重複出現（例如兩個「本月銷售」），保留最左邊第一個出現的原始名稱
        if (!(trimmedText in currentRowMap)) {
          currentRowMap[trimmedText] = rawText;
        }
      }
    }

    // 依優先順序檢查是否有完全相符的主鍵關鍵字
    const hasAnchor = anchorKeywords.some((kw) => kw in currentRowMap);
    if (hasAnchor) {
      headerRowIndex = r;
      trimmedToRawHeaderMap = currentRowMap;
      break;
    }
  }

  if (headerRowIndex === -1) {
    throw new Error(
      `${fileLabel}格式錯誤：在前 ${maxRows} 列中找不到「${anchorKeywords.join(" / ")}」欄位，請確認是否上傳正確檔案。`
    );
  }

  // 2. 在鎖定的表頭列中，依關鍵字陣列的「優先順序」找出每個欄位實際對應的原始表頭名稱
  const matchedColumns = {};
  for (const fieldKey of fieldKeys) {
    const candidates = fieldKeywordsMap[fieldKey];
    // 依照設定檔陣列由左至右的優先順序比對
    const matchedTrimmed = candidates.find((kw) => kw in trimmedToRawHeaderMap);
    if (!matchedTrimmed) {
      throw new Error(
        `${fileLabel}格式錯誤：在表頭列找不到「${candidates.join(" / ")}」欄位，請確認檔案或更新關鍵字設定。`
      );
    }
    matchedColumns[fieldKey] = trimmedToRawHeaderMap[matchedTrimmed];
  }

  // 3. 將工作表從 headerRowIndex 開始轉為 JSON（直接沿用原始 key，無須二次複製整份陣列）
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: headerRowIndex,
    range: headerRowIndex,
  });

  return {
    headerRowIndex,
    matchedColumns,
    jsonData,
  };
}

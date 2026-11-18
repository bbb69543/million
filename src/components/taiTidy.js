import * as XLSX from "xlsx";
import { COLUMN_KEYWORDS } from "../config/columnKeywords";
import { parseSheetByKeywords } from "../utils/excelHeaderFinder";

export default function taiTidy(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = e.target.result;
        // raw: false 確保像 "01230500" 或 "0706" 這類以 0 開頭的商品代碼不會在 CSV/Excel 被轉成數字而吃掉前導 0
        const workbook = XLSX.read(data, { type: "array", raw: false });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 自動在前 20 列 x 20 欄尋找表頭與對應欄位名稱
        const { matchedColumns, jsonData } = parseSheetByKeywords(
          worksheet,
          COLUMN_KEYWORDS.tai,
          "進銷存系統庫存檔"
        );

        const rearrangedData = jsonData.reduce((acc, item) => {
          const rawId = item[matchedColumns.productId];
          if (rawId === undefined || rawId === null) return acc;

          const productId = String(rawId).trim();
          if (!productId) return acc;

          // 移除千分位逗號後轉為數字
          const rawInv = String(item[matchedColumns.inventory] ?? "0").replace(/,/g, "");
          const inventory = Number(rawInv) || 0;
          const productName = item[matchedColumns.productName] || "";

          acc[productId] = {
            庫存量: inventory,
            商品名稱: productName,
          };

          return acc;
        }, {});

        resolve(rearrangedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

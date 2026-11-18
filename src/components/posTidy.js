import * as XLSX from "xlsx";
import { COLUMN_KEYWORDS } from "../config/columnKeywords";
import { parseSheetByKeywords } from "../utils/excelHeaderFinder";

export default function posTidy(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 自動在前 20 列 x 20 欄尋找表頭與對應欄位名稱
        const { matchedColumns, jsonData } = parseSheetByKeywords(
          worksheet,
          COLUMN_KEYWORDS.pos,
          "POS 系統庫存檔"
        );

        const rearrangedData = jsonData.reduce((acc, item) => {
          const rawId = item[matchedColumns.productId];
          if (rawId === undefined || rawId === null) return acc;

          const productId = String(rawId).trim();
          // 跳過無效資料列（商品編號為空，或含中文字的合計列如「本頁累計:」「總計:」）
          if (!productId || /[\u4e00-\u9fff]/.test(productId)) return acc;

          const inventory = Number(item[matchedColumns.inventory]) || 0;
          const salesThisMonth = Number(item[matchedColumns.sales]) || 0;
          const productName = item[matchedColumns.productName] || "";
          const totalSales = inventory + salesThisMonth;

          acc[productId] = {
            商品名稱: productName,
            庫存量: inventory,
            本月銷售: salesThisMonth,
            合計: totalSales,
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

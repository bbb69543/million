import * as XLSX from "xlsx";
import { COLUMN_KEYWORDS } from "../config/columnKeywords";
import { parseSheetByKeywords } from "../utils/excelHeaderFinder";

export default function ruleTidy(file) {
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
          COLUMN_KEYWORDS.rule,
          "4X1 店鋪商品數量轉換維護檔"
        );

        // 過濾出「序」為有效整數的資料列，並統一標準化欄位名稱供 analyze.js 與 TableData.jsx 使用
        const rearrangedData = jsonData
          .filter((item) => {
            const serialVal = Number(item[matchedColumns.serial]);
            return (
              item[matchedColumns.serial] !== undefined &&
              item[matchedColumns.serial] !== "" &&
              Number.isInteger(serialVal)
            );
          })
          .map((item) => ({
            序: Number(item[matchedColumns.serial]),
            營業所產品編號: String(item[matchedColumns.taiId] ?? "").trim(),
            店鋪商品條碼: String(item[matchedColumns.posId] ?? "").trim(),
            商品名稱: item[matchedColumns.productName] ?? "",
            轉換數量: Number(item[matchedColumns.ratio]) || 0,
          }));

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

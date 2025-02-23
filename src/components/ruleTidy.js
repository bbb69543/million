import * as XLSX from "xlsx";

export default function taiTidy(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      // 讀取 Excel 檔案
      const workbook = XLSX.read(data, { type: "array" });

      // 假設讀取第一個工作表
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // 將工作表轉換成 JSON 格式
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 5, // 設定第6行為表頭 (0-indexed)
        range: 5, // 設定從第6行開始讀取
      });

      //整理所需資料
      const rearrangedData = jsonData.filter((item) => {
        // 檢查 item["序"] 是否是有效的數字
        return Number.isInteger(item["序"]);
      });

      resolve(rearrangedData); // 使用 resolve 回傳資料
    };

    // 如果讀取檔案發生錯誤，回傳錯誤訊息
    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

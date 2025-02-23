import * as XLSX from "xlsx";

export default function posTidy(file) {
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
        header: 6, // 設定第7行為表頭 (0-indexed)
        range: 6, // 設定從第7行開始讀取
      });

      //整理所需資料
      const rearrangedData = jsonData.reduce((acc, item) => {
        const productId = item["商品編號"]; // 取商品編號作為物件的 key
        const inventory = item["庫存量"]; // 取庫存量
        const salesThisMonth = item["本月銷售"]; // 取本月銷售
        const totalSales = inventory + salesThisMonth; // 合計銷售 = 庫存量 + 本月銷售

        // 根據商品編號將資料整理進新物件
        acc[productId] = {
          庫存量: inventory,
          本月銷售: salesThisMonth,
          合計: totalSales
        };

        return acc;
      }, {});

      resolve(rearrangedData); // 使用 resolve 回傳資料
    };

    // 如果讀取檔案發生錯誤，回傳錯誤訊息
    reader.onerror = (error) => {
      reject(error); 
    };

    reader.readAsArrayBuffer(file);
  })
}



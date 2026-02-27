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

      // 動態偵測表頭列：掃描前 20 列，找出含「商品編號」欄位的那一列
      let headerRowIndex = -1;
      for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 20; c++) {
          const cell = worksheet[XLSX.utils.encode_cell({ r, c })];
          if (cell && cell.v === "商品編號") {
            headerRowIndex = r;
            break;
          }
        }
        if (headerRowIndex !== -1) break;
      }

      if (headerRowIndex === -1) {
        reject(new Error("POS 檔案格式錯誤：找不到「商品編號」欄位，請確認上傳的是正確的 POS 報表。"));
        return;
      }

      // 以動態偵測到的列作為表頭與資料起始
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: headerRowIndex,
        range: headerRowIndex,
      });

      //整理所需資料
      const rearrangedData = jsonData.reduce((acc, item) => {
        const productId = item["商品編號"]; // 取商品編號作為物件的 key
        const inventory = item["庫存量"]; // 取庫存量
        const salesThisMonth = item["本月銷售"]; // 取本月銷售

        // 跳過無效資料列（商品編號為空、非字串，或含中文字的合計列如「本頁累計:」「總計:」）
        if (!productId || typeof productId !== "string") return acc;
        if (/[\u4e00-\u9fff]/.test(productId)) return acc;

        const totalSales = (inventory || 0) + (salesThisMonth || 0); // 合計銷售 = 庫存量 + 本月銷售

        // 根據商品編號將資料整理進新物件
        acc[productId] = {
          庫存量: inventory || 0,
          本月銷售: salesThisMonth || 0,
          合計: totalSales,
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
  });
}



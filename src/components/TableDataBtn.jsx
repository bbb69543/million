import React from "react";
import { Fab, Box } from "@mui/material";
import * as XLSX from "xlsx";

function TableDataBtn(props) {
    // 處理 Excel 匯出的函式
    const handleExport = () => {
        // 將 JSON 資料轉換為工作表
        const ws = XLSX.utils.json_to_sheet(props.content);

        // 創建一個新的工作簿並將工作表添加到其中
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "pos-400核對表");

        // 將工作簿寫入二進位字串
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        // 將二進位字串轉換為 Blob 物件
        const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

        // 創建一個連結元素，觸發下載檔案
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "pos-400核對表.xlsx";  // 設定下載的檔案名稱
        link.click();
    };

    // 將二進位字串轉換為 ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    };

    return (
        <Box sx={{ textAlign: "right", mb: 3 }}>
            <Fab variant="contained" color="primary" sx={{ px: 2, my: 1, borderRadius: 1, width: "fit-content", height: 1 }} onClick={handleExport}>下載 Excel</Fab>
        </Box >
    );
}

export default TableDataBtn;
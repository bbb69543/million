import React from "react";
import { Fab, Box } from "@mui/material";

function TaxExportBtn({ content }) {
    const handleExport = () => {
        if (!content || !content.list || !content.info) {
            alert("無資料可匯出");
            return;
        }

        const { list, info } = content;

        // Helper to get value from info array
        const getInfoValue = (key) => {
            const item = info.find(i => i.label && i.label.includes(key));
            return item ? item.value : "";
        };

        const taxRegId = getInfoValue("稅籍編號") || "";
        const buyerId = getInfoValue("買受人統編") || "";

        if (!taxRegId || !buyerId) {
            alert("查無「稅籍編號」或「買受人統編」，請確認檔案是否正確選取店名。");
            return;
        }

        // Pad helper
        const pad = (str, len, char = "0", align = "right") => {
            const s = String(str || "");
            if (s.length >= len) return s.substring(0, len);
            return align === "right"
                ? s.padStart(len, char)
                : s.padEnd(len, char);
        };

        // Pad space helper for text (align left usually)
        const padText = (str, len) => pad(str, len, " ", "left");

        // Format Logic
        const rows = list.map(row => {
            // Mapping based on requirements and screenshot analysis
            // 1. Format Code (2) - "格式代號"
            const formatCode = pad(row["格式代號(2)"] || "21", 2);

            // 2. Tax Reg ID (9) - "稅籍編號" (From info)
            const globalTaxId = padText(taxRegId, 9); // Usually numeric but handled as string

            // 3. Serial (7) - "流水號(7)"
            const serial = pad(row["流水號(7)"], 7);

            // 4. Year (3) - "年(3)"
            const year = pad(row["年(3)"], 3);

            // 5. Month (2) - "月(2)"
            const month = pad(row["月(2)"], 2);

            // 6. Buyer ID (8) - "買受人統編" (From info)
            const globalBuyerId = padText(buyerId, 8);

            // 7. Seller ID (8) - "銷售人統編(8)"
            const sellerId = padText(row["銷售人統編(8)"], 8);

            // 8. Track (2) - "發票字軌(2-4)" -> screenshot shows 2.
            const track = padText(row["發票字軌(2-4)"], 2);

            // 9. Number (8) - "發票號碼(6-8)" -> screenshot shows 8 (pad 0)
            const number = pad(row["發票號碼(6-8)"], 8, "0");

            // 10. Sales (12) - "銷售金額(12)"
            const sales = pad(row["銷售金額(12)"], 12, "0");

            // 11. Tax Type (1) - "課稅別(1)"
            const taxType = pad(row["課稅別(1)"], 1, "1"); // Default 1?

            // 12. Tax Amount (10) - "營業稅額(10)"
            const taxAmount = pad(row["營業稅額(10)"], 10, "0");

            // 13. Deduction (1) - "扣抵代號(1)"
            const deduction = pad(row["扣抵代號(1)"], 1, "0"); // Default 1 or 0? user data shows 1

            // Concatenate strictly and append 8 spaces
            return `${formatCode}${globalTaxId}${serial}${year}${month}${globalBuyerId}${sellerId}${track}${number}${sales}${taxType}${taxAmount}${deduction}        `;
        });

        const textContent = rows.join("\r\n");

        // Create Blob
        const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });

        // Download
        const filename = buyerId ? `${buyerId}.txt` : "download.txt";
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    return (
        <Box sx={{ textAlign: "right", mb: 3 }}>
            <Fab variant="contained" color="primary" sx={{ px: 2, my: 1, borderRadius: 1, width: "fit-content", height: 1 }} onClick={handleExport}>
                下載進項發票媒體檔(.txt)
            </Fab>
        </Box>
    );
}

export default TaxExportBtn;

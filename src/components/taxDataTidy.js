import * as XLSX from "xlsx";

export default function taxDataTidy(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = e.target.result;
                // Read Excel file
                const workbook = XLSX.read(data, { type: "array" });

                // Read the first sheet
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert to Array of Arrays (header: 1) to manual parse
                const rawData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: "",
                    blankrows: false // Skip empty rows
                });

                const infoTable = [];
                const summaryTable = { title: [], data: [] };
                const mainList = [];
                let isMainList = false;
                let mainListHeader = [];

                const ALLOWED_HEADERS = [
                    "流水號", "格式代號", "年", "月", "銷售人統編",
                    "發票字軌", "發票號碼", "銷售金額", "營業稅額",
                    "課稅別", "扣抵代號"
                ];

                for (let i = 0; i < rawData.length; i++) {
                    const row = rawData[i];
                    if (!row || row.length === 0) continue;

                    // Check for specific keywords to identify sections
                    if (row.includes("店名") || row[0]?.toString().includes("店名")) {
                        infoTable.push({ label: "店名", value: row[1] || "" });
                    }
                    else if (row.includes("稅籍編號") || row[0]?.toString().includes("稅籍編號")) {
                        infoTable.push({ label: "稅籍編號", value: row[1] || "" });
                    }
                    else if (row.includes("買受人統編") || row[0]?.toString().includes("買受人統編")) {
                        infoTable.push({ label: "買受人統編", value: row[1] || "" });
                    }

                    // Summary Table Section
                    else if (row.includes("張數總計") || row[0]?.toString().includes("張數總計")) {
                        // Usually the header row
                        if (row.includes("銷售金額總計")) {
                            // It's the header row
                            const allowedSummaryHeaders = ["張數總計", "銷售金額總計", "營業稅額總計"];

                            // Map original indices to allowed headers
                            const summaryIndices = [];
                            const filteredTitles = [];

                            row.forEach((cell, idx) => {
                                if (cell && typeof cell === 'string') {
                                    if (allowedSummaryHeaders.some(h => cell.includes(h))) {
                                        filteredTitles.push(cell);
                                        summaryIndices.push(idx);
                                    }
                                }
                            });

                            summaryTable.title = filteredTitles;

                            // Grab data from the next row corresponding to these indices
                            if (rawData[i + 1]) {
                                const nextRow = rawData[i + 1];
                                summaryTable.data = summaryIndices.map(idx => nextRow[idx]);
                                i++; // Skip next row
                            }
                        }
                    }
                    // Main List Section
                    else if (!isMainList && (
                        row.some(cell => cell && cell.toString().includes("格式代號")) &&
                        row.some(cell => cell && cell.toString().includes("發票號碼"))
                    )) {
                        isMainList = true;
                        mainListHeader = row;
                    }
                    else if (isMainList) {
                        // Convert row array to object based on mainListHeader
                        const rowObj = {};
                        let hasValidData = false;

                        mainListHeader.forEach((header, index) => {
                            // Only include allowed headers
                            if (header && ALLOWED_HEADERS.some(allowed => header.toString().includes(allowed))) {
                                rowObj[header] = row[index];
                                // Check if this specific allowed column has data (optional, but good for filtering)
                                if (row[index] !== undefined && row[index] !== "" && row[index] !== null) {
                                    hasValidData = true;
                                }
                            }
                        });

                        // Use the strict whitelist to determine if we add the row.
                        // However, we should probably keep the original "hasContent" logic but scoped to allowed columns?
                        // If all allowed columns are empty, we probably shouldn't add it.
                        if (hasValidData) {
                            mainList.push(rowObj);
                        }
                    }
                }

                // Return structured data
                resolve({
                    info: infoTable,
                    summary: summaryTable,
                    list: mainList
                });

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

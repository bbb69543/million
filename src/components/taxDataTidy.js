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
                            summaryTable.title = row.filter(cell => cell && typeof cell === 'string' && (cell.includes("總計") || cell.includes("張數")));
                            // Assume next row is data
                            if (rawData[i + 1]) {
                                // We try to grab values corresponding to these columns, but simpler is to just grab valid numbers from next row
                                // Let's assume the next row aligns with these titles. 
                                // Or just grab the next row's non-empty values?
                                // Let's grab specific indices if we can, or just push row i+1
                                summaryTable.data = rawData[i + 1].filter(cell => cell !== undefined && cell !== "");
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
                        mainListHeader.forEach((header, index) => {
                            rowObj[header] = row[index];
                        });
                        // Filter out empty rows (where all values are empty)
                        const hasContent = Object.values(rowObj).some(val => val !== undefined && val !== "" && val !== null);
                        if (hasContent) {
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

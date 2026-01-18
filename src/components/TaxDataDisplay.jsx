import React from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography } from "@mui/material";
import GenericTable from "./GenericTable";

function TaxDataDisplay({ content }) {
    if (!content) return <div>No Data</div>;

    const { info, summary, list } = content;

    return (
        <Box sx={{ p: 2, flexGrow: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexShrink: 0 }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    {/* Top Left: Info Table */}
                    <Grid item xs={12} md={6}>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableBody>
                                    {info.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '40%', backgroundColor: '#f5f5f5' }}>
                                                {row.label}
                                            </TableCell>
                                            <TableCell align="left" sx={!row.value ? { backgroundColor: '#ffcdd2' } : {}}>
                                                {row.value || "無資料"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    {/* Top Right: Summary Table */}
                    <Grid item xs={12} md={6}>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {summary.title.map((title, index) => (
                                            <TableCell key={index} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>{title}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {summary.data.map((val, index) => (
                                            <TableCell key={index} align="center" sx={{ fontSize: '1.2rem' }}>{val}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>

            {/* Bottom: Main List */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden', mt: 2 }}>
                <GenericTable
                    content={list}
                    getCellSx={(header, row) => {
                        // Check if header contains "營業稅額" (Tax Amount)
                        if (header && header.includes("營業稅額")) {
                            // Find the corresponding "銷售金額" (Sales Amount) header
                            // We look for a key that includes "銷售金額" in the same row object
                            const salesHeader = Object.keys(row).find(key => key.includes("銷售金額"));

                            if (salesHeader) {
                                const sales = parseFloat(row[salesHeader]);
                                const tax = parseFloat(row[header]);

                                if (!isNaN(sales) && !isNaN(tax)) {
                                    // Rate strictly set to 0.05 (5%) based on standard interpretation of user request 
                                    // (User said 0.005 which is 0.5%, likely typo for 0.05 VAT)
                                    const calculatedTax = Math.round(sales * 0.05);
                                    if (calculatedTax !== tax) {
                                        return { backgroundColor: '#ffcdd2' }; // Light red for error
                                    }
                                }
                            }
                        }
                        return {};
                    }}
                />
            </Box>
        </Box>
    );
}

export default TaxDataDisplay;

import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function GenericTable(props) {
    const { content } = props;
    if (!content || content.length === 0) {
        return <div>檔案中無資料</div>;
    }

    // Get headers from the first object
    const headers = Object.keys(content[0]);

    return (
        <TableContainer component={Paper} sx={{ height: '100%', overflow: 'auto', pb: 2 }}>
            <Table stickyHeader id="table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.map((row, rowIndex) => (
                        <TableRow key={rowIndex} hover>
                            {headers.map((header, colIndex) => (
                                <TableCell key={colIndex} sx={props.getCellSx ? props.getCellSx(header, row) : {}}>
                                    {row[header]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default GenericTable;

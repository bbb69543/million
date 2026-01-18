import React from "react";
import { Box, Paper } from "@mui/material";
import TableData from "./TableData";
import TableDataBtn from "./TableDataBtn";
import TeachText from "./TeachText";

function ContentArea(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>

      <Paper
        elevation={props.elevation !== undefined ? props.elevation : 3}
        sx={{
          mx: 1,
          p: 1,
          height: "calc(100vh - 20px)", // Slightly less than 100vh to ensure bottom margin
          display: "flex",
          flexDirection: "column",
          // alignItems: "center", // Remove centering to allow full width/height
          // justifyContent: "center",
          overflow: "hidden" // Let child handle scroll
        }}
      >
        {props.content ? (
          props.ExportButton ?
            <props.ExportButton content={props.content} /> :
            <TableDataBtn content={props.content} />
        ) : null}
        {props.content ? (
          props.TableComponent ?
            <props.TableComponent content={props.content} /> :
            <TableData content={props.content} />
        ) : (props.intro || <TeachText />)}
      </Paper>
    </Box>
  );
}

export default ContentArea;

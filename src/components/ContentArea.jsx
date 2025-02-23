import React from "react";
import { Box, Paper } from "@mui/material";
import TableData from "./TableData";
import TableDataBtn from "./TableDataBtn";
import TeachText from "./TeachText";

function ContentArea(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>

      <Paper
        elevation={3}
        sx={{
          mx:1,
          minHeight: "95vh",
          // display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.content ? <TableDataBtn content={props.content} /> : null}
        {props.content ? <TableData content={props.content} /> : <TeachText />}
      </Paper>
    </Box>
  );
}

export default ContentArea;

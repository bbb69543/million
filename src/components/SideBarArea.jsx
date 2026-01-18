import React from "react";
import { Box, Fab } from "@mui/material";
import UploadButton from "./UploadButton";

function SideBarArea(props) {
  // the files we need
  const fileList = [
    "POS系統庫存 (.xls)",
    "進銷存系統庫存 (.xlt/.ods)",
    "店鋪商品數量轉換維護檔 (.xls)",
  ];
  return (
    <Box
      sx={{
        width: "18vw",
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'flex-start',
        alignItems: 'center', // Center content horizontally
        flexShrink: 0,
      }}
      className="animated-background"
    >
      <h1 style={{ margin: '10px 0' }}>蜜鄰對帳小工具</h1>
      <Box sx={{ width: "80%", marginBottom: 1, mx: "auto" }}>
        <img
          src="/images/homeImg.jpg"
          alt="Sidebar Illustration"
          style={{ width: "100%" }}
        />
      </Box>
      {fileList.map((item, index) => {
        return (
          <UploadButton
            label={item}
            key={index}
            index={index}
            files={props.files}
            handleUpload={props.handleUpload}
          />
        );
      })}
      <Fab
        variant="contained"
        color="primary"
        // fullWidth={true}
        sx={{ mt: 1, borderRadius: 1, width: 1, height: 30 }}
        onClick={props.handleCheck}
      >
        開始核對
      </Fab>
      <Fab
        variant="extended"
        sx={{
          mt: 'auto', // Push to bottom
          borderRadius: 1,
          width: 1,
          height: 48,
          bgcolor: '#607d8b',
          color: 'white',
          '&:hover': {
            bgcolor: '#455a64'
          }
        }}
        onClick={() => props.navigate('/')}
      >
        回首頁
      </Fab>
    </Box>
  );
}

export default SideBarArea;

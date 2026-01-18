import React from "react";
import { Box, Fab, Typography } from "@mui/material";
import UploadButton from "./UploadButton";

function TaxSideBarArea(props) {
    // the files we need
    const fileList = [
        "上傳進項發票資料(.xls/.ods)",
    ];
    return (
        <Box
            sx={{
                width: "17vw",
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'flex-start',
                alignItems: 'center', // Center content horizontally
                flexShrink: 0,
            }}
            className="animated-background"
        >
            <Typography variant="h5" component="h1" sx={{ mt: 0, mb: 3, fontWeight: 'bold' }}>
                報稅進項發票轉檔
            </Typography>
            <Box sx={{ width: "80%", marginBottom: 3, mx: "auto" }}>
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
                sx={{ mt: 2, borderRadius: 1, width: 1, height: 30 }}
                onClick={props.handleCheck}
            >
                確認上傳
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

export default TaxSideBarArea;

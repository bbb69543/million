import React, { useState } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";
import TaxSideBarArea from "../components/TaxSideBarArea";
import ContentArea from "../components/ContentArea";
import TaxDataDisplay from "../components/TaxDataDisplay";
import taxDataTidy from "../components/taxDataTidy";
import TaxExportBtn from "../components/TaxExportBtn";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import '../App.css'

function TaxConversionPage() {
    const navigate = useNavigate();
    const [content, setContent] = useState(null);
    const [files, setFile] = useState([null]); // Only 1 file needed

    function handleUpload(event, index) {
        const newFiles = [...files];
        newFiles[index] = event.target.files[0];
        setFile(newFiles);
    }

    async function handleCheck(e) {
        e.preventDefault();
        if (files.includes(null)) {
            alert("請上傳檔案!");
            return;
        }

        try {
            const parsedData = await taxDataTidy(files[0]);
            setContent(parsedData);
            // alert("上傳並讀取成功!");
        } catch (error) {
            console.error("檔案讀取錯誤", error);
            alert("檔案讀取失敗，請確認檔案格式");
        }
    }

    return (
        <Container
            maxWidth="xl"
            disableGutters={true}
            sx={{ display: "flex", height: "100vh", overflow: "hidden" }}
        >
            {/* Sidebar */}
            <TaxSideBarArea
                handleCheck={handleCheck}
                files={files}
                handleUpload={handleUpload}
                navigate={navigate}
            />
            {/* Content Area */}
            <ContentArea
                content={content}
                TableComponent={TaxDataDisplay}
                ExportButton={TaxExportBtn}
                elevation={0}
                intro={
                    <div className="scroll-container" id="tax-instruction-container">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <a href="/報稅進項發票(模板).ods" download="報稅進項發票(模板).ods" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" startIcon={<DownloadIcon />}>
                                    下載填寫資料用模板(.ods)
                                </Button>
                            </a>
                        </Box>

                        <h2>使用說明:</h2>
                        <ol>
                            <li><b>下載空白模板檔案</b>
                                <ul>右上角按鈕可下載空白模板檔案。</ul>
                            </li>
                            <li><b>填寫報稅資料</b>
                                <ul>
                                    <li>(1)選擇自己的<b>店名</b>(單位)。表單自動帶入稅籍資料及統編。
                                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                            <div className="imgContainer" style={{ width: 'auto', margin: 0 }}>
                                                <img src="images/tax_step_1.png" alt="Select shop name" style={{ height: '150px', width: 'auto' }}></img>
                                            </div>
                                            <div className="imgContainer" style={{ width: '291px', margin: 0, overflow: 'hidden' }}>
                                                <img src="images/tax_step_2.png" alt="Auto-filled tax info" style={{ height: '150px', width: 'auto' }}></img>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                                            若無資料，可至「稅籍資料+統編」分頁中新增資料
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <div className="imgContainer" style={{ width: 'auto', margin: 0 }}>
                                                <img src="images/tax_step_2_add_1.png" alt="Add tax info tab" style={{ height: '150px', width: 'auto' }}></img>
                                            </div>
                                            <div className="imgContainer" style={{ width: 'auto', margin: 0 }}>
                                                <img src="images/tax_step_2_add_2.png" alt="Add tax info data" style={{ height: '150px', width: 'auto' }}></img>
                                            </div>
                                        </div>
                                    </li>
                                    <li>(2)依序新增進項發票資料<br></br><b>不可跳行輸入</b>。若「營業稅額」不為「銷售金額」的5%(四捨五入)，稅額會出現紅底提示。
                                        <div className="imgContainer" style={{ width: 'auto', margin: 0, marginTop: '10px' }}>
                                            <img src="images/tax_step_2_item_2.png" alt="Tax calculation warning" style={{ maxWidth: '100%', height: 'auto' }}></img>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <b>上傳進項發票資料</b><br></br>左側邊欄選擇檔案，並上傳。
                                <div className="imgContainer" style={{ width: 'auto', margin: 0, marginTop: '10px' }}>
                                    <img src="images/tax_step_3_upload.png" alt="Upload file sidebar" style={{ height: '200px', width: 'auto' }}></img>
                                </div>
                            </li>
                            <li>
                                <b>下載進項發票媒體檔</b><br></br>上傳完成後，頁面會顯示檔案內容，可點擊右上角「下載進項發票媒體檔(.txt)」按鈕，下載檔案。
                                <div className="imgContainer" style={{ width: 'auto', margin: 0, marginTop: '10px' }}>
                                    <img src="images/tax_step_4_download.png" alt="Download file button" style={{ maxWidth: '100%', height: 'auto' }}></img>
                                </div>
                            </li>
                            <li>
                                <b>將檔案上傳至報稅系統</b><br></br>下載的媒體檔檔名為自己的統編，將檔案移至離線報稅系統預設路徑(C:/ETAX/BLR/UpLoad/Default/報稅月份)，並利用報稅系統介面的「媒體檔匯入」-&gt;「進銷項資料」功能，選擇該檔案，完成匯入。步驟可參考網站: <a href="https://blog.hungwin.com.tw/electronic-invoice-media-declaration-file/#2-3" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>https://blog.hungwin.com.tw/electronic-invoice-media-declaration-file/#2-3</a>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                                    <div className="imgContainer" style={{ width: '48%', margin: 0 }}>
                                        <img src="images/tax_step_5_import_menu.png" alt="Import menu" style={{ width: '100%', height: 'auto' }}></img>
                                    </div>
                                    <div className="imgContainer" style={{ width: '48%', margin: 0 }}>
                                        <img src="images/tax_step_5_import_dialog.png" alt="Import dialog" style={{ width: '100%', height: 'auto' }}></img>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <b>請再次確認進項發票資料是否正確!</b><br></br>若發現任何問題，請聯繫:姚禹安<a href="mailto:a08655@taisugar.com.tw" style={{ color: 'blue', textDecoration: 'underline' }}> a08655@taisugar.com.tw</a>
                            </li>
                        </ol>
                        <ScrollToTopBtn containerId="tax-instruction-container" />
                    </div>
                }
            />
        </Container >
    );
}

export default TaxConversionPage;

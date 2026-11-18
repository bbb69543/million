import React, { useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBarArea from "../components/SideBarArea";
import ContentArea from "../components/ContentArea";
import posTidy from "../components/posTidy";
import taiTidy from "../components/taiTidy";
import ruleTidy from "../components/ruleTidy";
import analyze from "../components/analyze";

function AnalysisPage() {
    const navigate = useNavigate();
    const [content, setContent] = useState(null);
    const [files, setFile] = useState([null, null, null]);

    function handleUpload(event, index) {
        const newFiles = [...files];
        newFiles[index] = event.target.files[0];
        setFile(newFiles);
    }

    async function handleCheck(e) {
        e.preventDefault();
        if (files.includes(null)) {
            alert("請上傳3個檔案!");
            return;
        }
        try {
            const [posFile, taiFile, ruleFile] = files;

            const [posData, taiData, ruleTable] = await Promise.all([
                posTidy(posFile),
                taiTidy(taiFile),
                ruleTidy(ruleFile),
            ]);

            const result = analyze(posData, taiData, ruleTable);
            setContent(result);
        } catch (error) {
            console.error("檔案解析錯誤", error);
            alert(error.message || "檔案解析錯誤，請確認上傳的檔案格式是否正確！");
        }
    }

    return (
        <Container
            maxWidth="xl"
            disableGutters={true}
            sx={{ display: "flex", height: "100vh", overflow: "hidden" }}
        >
            {/* Sidebar */}
            <SideBarArea
                handleCheck={handleCheck}
                files={files}
                handleUpload={handleUpload}
                navigate={navigate}
            />
            {/* Content Area */}
            <ContentArea content={content} elevation={0} />
        </Container>
    );
}

export default AnalysisPage;

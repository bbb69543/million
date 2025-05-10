import React, { useState } from "react";
import { Container } from "@mui/material";
import SideBarArea from "./components/SideBarArea";
import ContentArea from "./components/ContentArea";
import posTidy from "./components/posTidy";
import taiTidy from "./components/taiTidy";
import ruleTidy from "./components/ruleTidy";
import analyze from "./components/analyze";
import './App.css'

function App() {
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
    }
    try {
      const posFile = files[0];
      const taiFile = files[1];
      const ruleFile = files[2];

      const posData = await posTidy(posFile);
      const taiData = await taiTidy(taiFile);
      const ruleTable = await ruleTidy(ruleFile);

      const result = await analyze(posData, taiData, ruleTable)
      setContent(result);
    } catch (error) {
      console.error("檔案解析解析錯誤", error);
    }
  }

  return (
    <Container
      maxWidth="xl"
      disableGutters={true}
      sx={{ display: "flex", minHeight: "100vh" }}
    >
      {/* Sidebar */}
      <SideBarArea
        handleCheck={handleCheck}
        files={files}
        handleUpload={handleUpload}
      />
      {/* Content Area */}
      <ContentArea content={content} />
    </Container>
  );
}

export default App;

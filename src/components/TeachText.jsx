import React from "react";
import ScrollToTopBtn from "./ScrollToTopBtn";

function TeachText() {
  return (
    <div id="teachText" className="scroll-container">
      <h2>蜜鄰對帳小工具所需文件:</h2>
      <ol>
        <a href="#pos"><li>POS系統庫存 (點擊查看)</li></a>
        <a href="#tai"><li>進銷存庫存 (點擊查看)</li></a>
        <a href="#4x1"><li>4X1_店舖商品數量轉換維護 (點擊查看)</li></a>
      </ol>
      <h2>核對結果注意事項:</h2>
      <ul>
        <li>頁面顯示結果<br></br>有差異量時，數字會標<b style={{ color: "red", }}>紅色</b>。
          <div className="imgContainer">
            <img src="images/result1.png" alt="the normal result"></img>
          </div>
        </li>
        <li>遇到<b>相同營業所產品編號，但不同國際條碼</b>時，底色會變<b style={{ backgroundColor: "#CCEEFF", }}>淺藍色</b>，兩列進銷存庫存量相同且數值即為進銷存庫存(並非相加的值)。
          <div className="imgContainer">
            <img src="images/result2.png" alt="Double barcode condition"></img>
          </div>
        </li>
        <li>遇到<b>編號類似品項</b>時(如:1組3罐、1盒6入)，底色會變<b style={{ backgroundColor: "#CCEEFF", }}>淺藍色</b>，零散或成組的庫存即為各自的的庫存。
          <div className="imgContainer">
            <img src="images/result3.png" alt="Single and group condition"></img>
          </div>
        </li>
        <li>遇到<b>4x1商品轉換檔內沒有資料的品項</b>時(如:990303水煮鯖魚3入、M90101應稅外貨品)，資料會在表格<b>底部</b>。
          <div className="imgContainer">
            <img src="images/result4.png" alt="Single and group condition"></img>
          </div>
        </li>
      </ul>
      <h2>文件下載位置:</h2>
      <ol>
        <li id="pos">POS系統庫存
          <ul>
            <li>登入蜜鄰pos系統</li>
            <li>【6A商品分類庫存統計表】</li>
            <li>設定條件<br></br>【分類方式：9類別明細、門市編號：自己店的店號、類別編號：10(台糖貨)、排行名次：99999、零庫存列印：1是、列印選項：全部】</li>
            <li>【確定】</li>
            <li>【EXCEL一頁式報表】</li>
            <li>【確定】</li>
            <li>檔案另存新檔</li>
          </ul>
          <div className="imgContainer">
            <img src="images/posSearch.png" alt="the condition for POS system"></img>
          </div>
        </li>
        <li id="tai">進銷存庫存
          <ul>
            <li>登入公司進銷存系統</li>
            <li>【WM_倉庫管理】</li>
            <li>【WM_07_查詢或報表】</li>
            <li>【WM_07_01查詢商品庫存】</li>
            <li>設定條件<br></br>【倉庫組織：自己的營業所、倉庫代號：自己的庫號、庫存日期：當日】</li>
            <li>【查詢】</li>
            <li>【匯出】</li>
            <li>檔案另存新檔</li>
          </ul>
          <div className="imgContainer">
            <img src="images/taiSearch.png" alt="the condition for TaiSugar system"></img>
          </div>
        </li>
        <li id="4x1">4X1_店舖商品數量轉換維護
          <ul>
            <li>登入蜜鄰pos系統</li>
            <li>【4X1_店舖商品數量轉換維護】</li>
            <li>左上角【列印】</li>
            <li>設定條件<br></br>【營業所產品編號：全部、店舖商品條碼：全部】</li>
            <li>【確定】</li>
            <li>檔案另存新檔</li>
          </ul>
          <div className="imgContainer">
            <img src="images/4x1Search.png" alt="the condition for rule"></img>
          </div>
        </li>
      </ol>
      <p>有任何問題請聯繫: 姚禹安 a08656@taisugar.com.tw</p>
      <ScrollToTopBtn containerId="teachText" />
    </div>
  );
}

export default TeachText;

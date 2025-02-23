import React from "react";

function TableData(props) {
    return (
        <div style={{ height: "90vh", overflowY: 'auto', border: '1px solid #ddd' }}>
            <table border="1" id="table" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>序</th>
                        <th>營業所產品編號</th>
                        <th>店鋪商品條碼</th>
                        <th>商品名稱</th>
                        <th>pos庫存量</th>
                        <th>pos銷售量</th>
                        <th>pos庫存+銷售</th>
                        <th>進銷存庫存量</th>
                        <th>差異量(400-pos)</th>
                    </tr>
                </thead>
                <tbody>
                    {props.content.map((item, index, array) => (
                        <tr
                            key={index}
                            style={
                                ((array[index - 1]?.["營業所產品編號"] && typeof item["營業所產品編號"] === "string" && item["營業所產品編號"].includes(array[index - 1]["營業所產品編號"])) ||
                                    (array[index + 1]?.["營業所產品編號"] && typeof array[index + 1]["營業所產品編號"] === "string" && array[index + 1]["營業所產品編號"].includes(item["營業所產品編號"])))

                                    ? { backgroundColor: "#CCEEFF" }
                                    : null
                            }
                        >
                            <td>{item["序"]}</td>
                            <td>{item["營業所產品編號"]}</td>
                            <td>{item["店鋪商品條碼"]}</td>
                            <td>{item["商品名稱"]}</td>
                            <td>{item["pos庫存量"]}</td>
                            <td>{item["pos銷售量"]}</td>
                            <td>{item["pos庫存+銷售"]}</td>
                            <td>{item["進銷存庫存量"]}</td>
                            <td style={{
                                color: item["差異量(400-pos)"] !== 0 ? "red" : "black", // 差異量不等於0時字體顯示紅色
                            }}>{item["差異量(400-pos)"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableData;
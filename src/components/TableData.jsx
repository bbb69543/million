import React from "react";

function TableData(props) {
    return (
        <div className="table-scroll-wrapper">
            <table border="1" id="table">
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
                    {props.content.map((item, index, array) => {
                        const isOrphanProduct = item["序"] === undefined;
                        const isRelatedProduct =
                            (array[index - 1]?.["營業所產品編號"] && typeof item["營業所產品編號"] === "string" && item["營業所產品編號"].includes(array[index - 1]["營業所產品編號"])) ||
                            (array[index + 1]?.["營業所產品編號"] && typeof array[index + 1]["營業所產品編號"] === "string" && array[index + 1]["營業所產品編號"].includes(item["營業所產品編號"]));

                        const rowClassName = isOrphanProduct
                            ? "row-highlight-yellow"
                            : isRelatedProduct
                            ? "row-highlight-blue"
                            : "";

                        return (
                            <tr
                                key={index}
                                className={rowClassName}
                            >
                                <td>{item["序"]}</td>
                                <td>{item["營業所產品編號"]}</td>
                                <td>{item["店鋪商品條碼"]}</td>
                                <td>{item["商品名稱"]}</td>
                                <td>{item["pos庫存量"]}</td>
                                <td>{item["pos銷售量"]}</td>
                                <td>{item["pos庫存+銷售"]}</td>
                                <td>{item["進銷存庫存量"]}</td>
                                <td className={item["差異量(400-pos)"] !== 0 ? "text-diff-error" : "text-diff-normal"}>
                                    {item["差異量(400-pos)"]}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TableData;
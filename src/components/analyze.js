export default function analyze(pos, tai, rule) {
  const combineData = rule.map((item) => {
    let posNum = item["店鋪商品條碼"];
    let taiNum = item["營業所產品編號"];
    let ruleArg = item["轉換數量"];
    const newItem = { ...item };

    //加入pos庫存、銷售、總和
    if (pos[posNum]) {
      newItem["pos庫存量"] = pos[posNum]["庫存量"];
      newItem["pos銷售量"] = pos[posNum]["本月銷售"];
      newItem["pos庫存+銷售"] = pos[posNum]["合計"];
    } else {
      newItem["pos庫存量"] = 0;
      newItem["pos銷售量"] = 0;
      newItem["pos庫存+銷售"] = 0;
    }
    //加入進銷存庫存
    if (tai[taiNum]) {
      newItem["進銷存庫存量"] = tai[taiNum]["庫存量"] * ruleArg;
    } else {
      newItem["進銷存庫存量"] = 0;
    }

    newItem["差異量(400-pos)"] =
      newItem["進銷存庫存量"] - newItem["pos庫存+銷售"];

    return newItem;
  });

  // 先處理 pos 和 tai 中沒對到 rule 的資料
  Object.keys(pos).forEach((posNum) => {
    if (!rule.some((item) => item["店鋪商品條碼"] === posNum)) {
      const newItem = {
        店鋪商品條碼: posNum,
        pos庫存量: pos[posNum]["庫存量"],
        pos銷售量: pos[posNum]["本月銷售"],
        "pos庫存+銷售": pos[posNum]["合計"],
        進銷存庫存量: 0, // 沒有 rule 資料，所以設為 0
        "差異量(400-pos)": 0 - pos[posNum]["合計"], // 因為沒有進銷存資料，所以差異即為庫存+銷售
      };
      combineData.push(newItem);
    }
  });

  Object.keys(tai).forEach((taiNum) => {
    if (!rule.some((item) => item["營業所產品編號"] == taiNum)) {
      const newItem = {
        營業所產品編號: taiNum,
        pos庫存量: 0, // 沒有 pos 資料
        pos銷售量: 0,
        "pos庫存+銷售": 0,
        進銷存庫存量: tai[taiNum]["庫存量"], // tai 資料
        "差異量(400-pos)": tai[taiNum]["庫存量"], // 因為沒有 pos 資料，所以差異為進銷存庫存量
      };
      combineData.push(newItem);
    }
  });

  const result = combineData.filter((item) => {
    //去除庫存皆為0的資料
    return (
      item["pos庫存量"] |
      item["pos銷售量"] |
      item["pos庫存+銷售"] |
      item["進銷存庫存量"]
    );
  });

  return result;
}

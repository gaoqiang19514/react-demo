/*
 * @LastEditors  : xiaojie
 * @LastEditTime : 2019-12-31 09:42:47
 * @Description:: wkt 数据转为GeoJson
 */

function formatWktData(wktData) {
  if (!wktData) {
    alert("wkt数据不存在");
    return [];
  }
  if (wktData.startsWith("POINT")) {
    const firstLeftIndex = wktData.indexOf("(");
    // 去掉首尾括号
    const str = wktData.substring(firstLeftIndex + 1, wktData.length - 1);
    const ptArr = str.split(" ");
    return [Number(ptArr[0]), Number(ptArr[1])];
  } else if (wktData.startsWith("MULTIPOLYGON")) {
    const firstLeftIndex = wktData.indexOf("(");
    // 去掉首尾括号
    const str = wktData.substring(firstLeftIndex + 1, wktData.length - 1);
    const pArray = [];
    const polygonArray = str.split(")),((");
    for (let i = 0; i < polygonArray.length; i++) {
      let pStr = polygonArray[i]; //每个polygon的String
      if (polygonArray.length === 1) {
        //如果只有1个，说明没有被分割
        // 去掉第一个( 去掉结尾)
        pStr = pStr.substring(1, pStr.length - 1);
      } else if (i === 0) {
        // 第一个，去第一个( 补结尾加上 )
        pStr = `${pStr.substring(1, pStr.length)})`; // (),(),() 环的集合
      } else if (i === polygonArray.length - 1) {
        // 最后一个: 补第一个( ， 去 最后一个)
        pStr = `(${pStr.substring(0, pStr.length - 1)}`;
      } else {
        // 中间，补第一个( 补最后一个 )
        pStr = `(${pStr})`;
      }

      // pStr 表示 () , () ,() 线环集合

      // 分割环
      const rArray = [];
      const ringsArray = pStr.split("),(");
      for (let j = 0; j < ringsArray.length; j++) {
        let ringStr = ringsArray[j];

        if (ringsArray.length === 1) {
          // 去掉第一个( 去掉结尾 )
          ringStr = ringStr.substring(1, ringStr.length - 1);
        } else if (j === 0) {
          // 如果是第一个 去掉第一个(
          ringStr = ringStr.substring(1, ringStr.length);
        } else if (j === ringsArray.length - 1) {
          // 最后一个 去掉结尾 )
          ringStr = ringStr.substring(0, ringStr.length - 1);
        }
        // 再按逗号分割就是点集合
        const pointArr = ringStr.split(",");
        for (let k = 0; k < pointArr.length; k++) {
          const ptArr = pointArr[k].trim().split(" ");
          rArray.push([Number(ptArr[0]), Number(ptArr[1])]);
        }
      }
      pArray.push(rArray);
    }
    return pArray;
  } else if (wktData.startsWith("POLYGON")) {
    const firstLeftIndex = wktData.indexOf("(");
    // 去掉首尾括号
    const str = wktData.substring(firstLeftIndex + 1, wktData.length - 1); // (),(),()

    const rArray = [];
    const ringsArray = str.split("),(");
    for (let j = 0; j < ringsArray.length; j++) {
      let ringStr = ringsArray[j];
      if (ringsArray.length === 1) {
        // 去掉第一个( 去掉结尾 )
        ringStr = ringStr.substring(1, ringStr.length - 1);
      } else if (j === 0) {
        // 如果是第一个
        // 去掉第一个(
        ringStr = ringStr.substring(1, ringStr.length);
      } else if (j === ringsArray.length - 1) {
        // 最后一个
        // 去掉结尾 )
        ringStr = ringStr.substring(0, ringStr.length - 1);
      }
      const pointArr = ringStr.split(",");
      for (let k = 0; k < pointArr.length; k++) {
        const ptArr = pointArr[k].trim().split(" ");
        rArray.push([Number(ptArr[0]), Number(ptArr[1])]);
      }
    }
    return rArray;
  }
  return [];
}

export default formatWktData;

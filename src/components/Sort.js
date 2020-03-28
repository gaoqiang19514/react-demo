import React, { useState, useMemo } from "react";

/**
 * sort的比较函数参数
 * @param {Object} curr
 * @param {Object} next
 */
function compare(curr, next, key, dir = true) {
  if (curr[key] < next[key]) {
    return dir ? -1 : 1;
  }
  if (curr[key] > next[key]) {
    return dir ? 1 : -1;
  }
  return 0;
}

function useSortableData(products) {
  const [compareKey, setCompareKey] = useState("");
  const [direction, setDirection] = useState(true);

  const startCompare = key => {
    let dir = true;
    if (key === compareKey && direction) {
      dir = false;
    }
    setDirection(dir);
    setCompareKey(key);
  };

  const items = useMemo(() => {
    let sortedProducts = [...products];

    sortedProducts.sort((curr, next) =>
      compare(curr, next, compareKey, direction)
    );

    return sortedProducts;
  }, [products, compareKey, direction]);

  return {
    items,
    startCompare
  };
}

function Sort({ products }) {
  const { items, startCompare } = useSortableData(products);

  return (
    <table>
      <caption>Our products</caption>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => startCompare("name")}>
              名称
            </button>
          </th>
          <th>
            <button type="button" onClick={() => startCompare("price")}>
              价格
            </button>
          </th>
          <th>
            <button type="button" onClick={() => startCompare("stock")}>
              库存数量
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Sort;

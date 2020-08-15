async function request(url) {
  try {
    const response = await fetch(url);
    const { code, data } = await response.json();

    if (code === 0 && data) {
      return [null, data];
    }

    return [new Error("暂无数据")];
  } catch (err) {
    return [err];
  }
}

export { request };

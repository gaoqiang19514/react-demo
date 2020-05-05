import { useEffect, useRef } from "react";

// 这跟用useState来创建一个变量来控制有什么区别吗？

function useEffectOnce(cb = () => {}) {
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) {
      return;
    }

    cb();
    didRun.current = true;
  });
}

export default useEffectOnce;

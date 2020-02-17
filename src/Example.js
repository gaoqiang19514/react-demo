function func(n) {
  if (1 === n) {
    return n;
  }

  return n + func(n - 1);
}

func(3); // 6

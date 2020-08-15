const react = [
  [114.042975, 22.588264],
  [114.032339, 22.571178],
  [114.080057, 22.554891],
  [114.044412, 22.553289],
  [114.105641, 22.563168],
  [114.043837, 22.547148],
];
const vue = [
  [114.116564, 22.562367],
  [114.044125, 22.657386],
  [114.007618, 22.61629],
];

export function getData({ key }) {
  return new Promise((resolve) => {
    console.log("request", key);

    setTimeout(() => {
      if (key === "react") {
        resolve({ data: react });
      }

      if (key === "vue") {
        resolve({ data: vue });
      }
    }, 1000);
  });
}

export default {
  getData,
};

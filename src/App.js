import React from "react";
import axios from "axios";

function main() {
  axios
    .post(
      "/zhzf/zfzh/zfzh-service/webapi/resourceMap/getResourceMapDevice",
      { areaCode: 4403 },
      {
        headers: {
          timestamp: "1588060061148",
          sign: "860a08b340273cef8f8a309aa1c5c654",
          nonce: "605962901588060000000",
          "X-AppCode": "zfzh-admin",
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

function App() {
  return (
    <div className="App">
      <button onClick={main}>start</button>
    </div>
  );
}

export default App;

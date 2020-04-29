import React from "react";
import axios from "axios";

// axios
//   .post(
//     "/zhzf/zfzh/zfzh-service/webapi/resourceMap/getResourceMapDevice",
//     { areaCode: 4403 },
//     {
//       headers: {
//         timestamp: "1588060061148",
//         sign: "860a08b340273cef8f8a309aa1c5c654",
//         nonce: "605962901588060000000",
//         "X-AppCode": "zfzh-admin",
//       },
//     }
//   )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
// http://localhost.charlesproxy.com:3000/statistics-service/statistic/webapi/screen/highIncidenceTop
// https://www.fastmock.site/mock/d0d715d7a91724b6f295ed88af4e7bda/mock/getPersonClockInData
function main() {
  axios
    .post("http://localhost.charlesproxy.com:4000/getUsers")
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

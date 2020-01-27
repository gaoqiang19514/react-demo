import React, { Component } from "react";

import API from "../api";

export default class Example extends Component {
  componentDidMount() {
    const items = [5000, 4000, 3000, 2000, 1000];

    // 能确定结束 并发
    // Promise.all(items.map(API.getUsers))
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     console.log("end");
    //   });

    // 能确定结束 继发
    // (async () => {
    //   for (let item of items) {
    //     console.log('item send')
    //     await request(item);
    //   }
    //   console.log("end");
    // })();

    // 能确定结束 并发
    (async () => {
      const temp = [];

      for (let item of items) {
        temp.push(API.getUsers(item));
      }

      const result = [];
      for (let t of temp) {
        result.push(await t);
      }

      console.log("end", result);
    })();
  }

  render() {
    return <div></div>;
  }
}

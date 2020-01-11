import React, { Component } from "react";

function getUserinfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        msg: "ok",
        data: [
          { id: 1, name: "tom" },
          { id: 2, name: "lina" }
        ]
      });
    }, 2000);
  });
}

const HOC = Wapper =>
  class User extends Component {
    state = {
      userInfo: []
    };

    async componentDidMount() {
      const { code, data } = await getUserinfo();

      if (!code === 0) {
        return;
      }

      this.setState({ userInfo: data });
    }

    render() {
      return (
        <Wapper {...this.props} userInfo={this.state.userInfo} />
      );
    }
  };

export default HOC;

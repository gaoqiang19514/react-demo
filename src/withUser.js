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

function withUser(WrappedComponent) {
  return class WrappingComponent extends Component {
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
        <WrappedComponent {...this.props} userInfo={this.state.userInfo} />
      );
    }
  };
}

export default withUser;

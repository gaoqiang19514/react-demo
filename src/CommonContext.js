import React from "react";

function delay(interval = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
}

function With(Component) {
  return class extends React.Component {
    state = {
      userInfo: {},
    };

    componentDidMount() {
      delay(2000).then(() => {
        this.setState({
          userInfo: {
            name: "tom",
            age: 30,
          },
        });
      });
    }

    render() {
      return <Component {...this.state.userInfo} {...this.props} />;
    }
  };
}

export { With };

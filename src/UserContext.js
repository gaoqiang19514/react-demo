import React from "react";

const defaultValue = {
  name: "tom",
  age: 0,
};

const Context = React.createContext(defaultValue);
const { Consumer, Provider } = Context;

function connect(mapProps) {
  const mapWrappedProps = (state) => {
    return mapProps ? mapProps(state) : state;
  };

  return (WrappedComponent) => {
    return (props) => {
      return (
        <Consumer>
          {(state) => (
            <WrappedComponent {...mapWrappedProps(state)} {...props} />
          )}
        </Consumer>
      );
    };
  };
}

export default Context;
export { Provider, Consumer, connect };

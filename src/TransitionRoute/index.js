import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import "./styles.css";

function TransitionRoute(props) {
  const { location, children, ...rest } = props;

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={450}
        {...rest}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
}

TransitionRoute.propTypes = {};

export default TransitionRoute;

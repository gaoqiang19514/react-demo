import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { Mask, Container, CloseBtn } from './styled';

const TIMEOUT = 300;

const propTypes = { onClose: PropTypes.func, children: PropTypes.any };

function Modal(props) {
  const { onClose, children } = props;
  const [inProp, setInProp] = useState(true);

  const onClick = (e) => {
    e.stopPropagation();

    setInProp(false);

    setTimeout(() => {
      onClose();
    }, TIMEOUT);
  };

  return (
    <Container>
      <CSSTransition appear in={inProp} timeout={TIMEOUT} classNames="fade">
        <Mask onClick={onClick}>
          <CloseBtn onClick={onClick}>×</CloseBtn>
          {children}
        </Mask>
      </CSSTransition>
    </Container>
  );
}

Modal.propTypes = propTypes;

function openModal(children) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  const onClose = () => {
    if (!div) {
      return;
    }

    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
    div = null;
  };

  // 调出弹层
  ReactDOM.render(<Modal onClose={onClose}>{children}</Modal>, div);
}

export { openModal };
export default Modal;

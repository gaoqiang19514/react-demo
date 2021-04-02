import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { onIncrement, onDecrement } from '@/actions';

const Item = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

const propTypes = {
  count: PropTypes.number,
  items: PropTypes.arrayOf(Item),
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

const defaultProps = {
  count: -1,
  items: [],
  onIncrement: () => {},
  onDecrement: () => {},
};

function List(props) {
  const { count, items, onIncrement, onDecrement } = props;

  return (
    <div>
      count: {count}
      <button type="button" onClick={onIncrement}>
        increment
      </button>
      <button type="button" onClick={onDecrement}>
        decrement
      </button>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </div>
  );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

const mapState = (state) => ({
  count: state.count,
});

const mapDispatch = (dispatch) => ({
  onIncrement: () => {
    dispatch(onIncrement());
  },
  onDecrement: () => {
    dispatch(onDecrement());
  },
});

export default connect(mapState, mapDispatch)(List);

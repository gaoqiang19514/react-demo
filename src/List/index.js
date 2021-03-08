import React from 'react';
import PropTypes from 'prop-types';

const Item = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
});

const propTypes = {
    items: PropTypes.arrayOf(Item),
};

const defaultProps = {
    items: [],
};

function List(props) {
    const { items } = props;

    return (
        <div>
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </div>
    );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cascader } from 'antd';

import { converterPrimary, getApi, getConverter, getItemById } from './config';

const propTypes = {
  leafType: PropTypes.number.isRequired,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultProps = {
  defaultValue: [],
  onChange: PropTypes.func,
};

class AddressCascader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    const { defaultValue } = this.props;

    this.initLoad([0, ...defaultValue]);
  }

  initLoad = async (arr) => {
    let tree = [];

    for (let i = 0; i < arr.length; i += 1) {
      const id = arr[i];

      const api = getApi(i);
      const converter = getConverter(i);

      const res = await api({ id });
      const data = converter(res.data.data);

      if (tree.length < 1) {
        tree = [...data];
      } else {
        tree = getItemById(id, tree, data);
      }
    }

    this.setState({ options: tree });
  };

  loadData = async (selectedOptions) => {
    const { leafType } = this.props;

    const targetOption = selectedOptions[selectedOptions.length - 1];

    targetOption.loading = true;
    const api = getApi(targetOption.type);
    const converter = getConverter(targetOption.type);
    const res = await api({ id: targetOption.value });

    targetOption.loading = false;
    const value = converter(res.data.data, leafType);

    if (value.length > 0) {
      targetOption.children = [...value];
    }

    this.setState((state) => {
      return {
        ...state,
      };
    });
  };

  onChange = (value) => {
    console.log('value', value);
  };

  render() {
    const { defaultValue } = this.props;
    const { options } = this.state;

    return (
      <Cascader
        style={{ width: 300 }}
        defaultValue={defaultValue}
        options={options}
        loadData={this.loadData}
        onChange={this.onChange}
      />
    );
  }
}

AddressCascader.propTypes = propTypes;
AddressCascader.defaultProps = defaultProps;

export default AddressCascader;

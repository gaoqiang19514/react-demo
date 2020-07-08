import React, { Component } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const DIFF = 7;

class DatePickerExample extends Component {
  state = {
    startValue: null,
    endValue: null,
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange("startValue", value);
  };

  onEndChange = (value) => {
    this.onChange("endValue", value);
  };

  disabledStartDate = (currDate) => {
    const { endValue } = this.state;

    if (!currDate || !endValue) {
      return false;
    }

    // 如果currDate大于结束日期，禁用currDate
    if (currDate.valueOf() > endValue.valueOf()) {
      return true;
    }

    // 如果currDate比endValue晚，禁用currDate
    if (currDate.diff(endValue, "days") > DIFF) {
      return true;
    }

    // 如果currDate比endValue晚，禁用currDate
    if (currDate.diff(endValue, "days") < -DIFF) {
      return true;
    }

    return false;
  };

  disabledEndDate = (currDate) => {
    const { startValue } = this.state;

    if (!currDate || !startValue) {
      return false;
    }

    // 如果currDate小于开始日期，禁用currDate
    if (currDate.valueOf() < startValue.valueOf()) {
      return true;
    }

    // 如果currDate比startValue晚，禁用currDate
    if (currDate.diff(startValue, "days") > DIFF) {
      return true;
    }

    // 如果currDate比startValue早，禁用currDate
    if (currDate.diff(startValue, "days") < -DIFF) {
      return true;
    }

    // 上面两个判断禁用了大于或者小于开始时间的日期

    return false;
  };

  render() {
    const { startValue, endValue } = this.state;

    return (
      <div>
        <DatePicker
          value={startValue}
          disabledDate={this.disabledStartDate}
          onChange={this.onStartChange}
        />
        <DatePicker
          value={endValue}
          disabledDate={this.disabledEndDate}
          onChange={this.onEndChange}
        />
      </div>
    );
  }
}

export default DatePickerExample;

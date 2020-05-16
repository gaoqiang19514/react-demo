import React, { Component } from "react";
import { DatePicker } from "antd";

const DIFF = 10;

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

    // 如果结束时间与开始时间的时间差 > N 则禁用
    return (
      endValue.diff(currDate, "days") > DIFF ||
      currDate.diff(endValue, "days") > DIFF ||
      currDate.valueOf() > endValue.valueOf()
    );
  };

  disabledEndDate = (currDate) => {
    const { startValue } = this.state;

    if (!currDate || !startValue) {
      return false;
    }

    // 如果结束时间与开始时间的时间差 > N 则禁用
    return (
      startValue.diff(currDate, "days") > DIFF ||
      currDate.diff(startValue, "days") > DIFF ||
      currDate.valueOf() <= startValue.valueOf()
    );
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

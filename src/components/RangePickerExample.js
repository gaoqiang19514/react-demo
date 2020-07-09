import React, { Component } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

class DatePickerExample extends Component {
  state = { range: [] };

  disabledDate = (currDate) => {
    const [minDate, maxDate] = this.state.range;

    if (!currDate || (!minDate && !maxDate)) {
      return false;
    }

    if (currDate.isBefore(minDate, "day")) {
      return true;
    }

    if (currDate.isAfter(maxDate, "day")) {
      return true;
    }

    return false;
  };

  onChange = (date) => {
    this.setState({ range: date });
  };

  render() {
    const { range } = this.state;

    return (
      <div>
        <div>
          <h3>日期范围</h3>
          <RangePicker value={range} onChange={this.onChange} />
        </div>
        <div>
          <h3>受限日期</h3>
          <RangePicker disabledDate={this.disabledDate} />
        </div>
      </div>
    );
  }
}

export default DatePickerExample;
